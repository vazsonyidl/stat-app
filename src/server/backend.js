const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const {getUnemploymentSchema} = require('./models/unemployment');
const {getPrePrimaryBasic} = require('./models/preprimary_education');

const app = express();
const port = process.env.PORT || 2000;
app.set('port', port);
app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  })
);

app.get('/', (request, response) => {
  response.send("Welcome to NODE API!");
})

app.get('/unemployment_rate', getUnemploymentSchema);
app.get('/education_preprimary', getPrePrimaryBasic);

app.listen(port , () => {
  console.log(`Server running on: ${port}`);
})
