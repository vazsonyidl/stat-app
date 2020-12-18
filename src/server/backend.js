const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const {getUnemploymentSchema, getFilteredUnemployment} = require('./models/unemployment');
const {getPrePrimarySchema, getFilteredPrePrimary} = require('./models/preprimary_education');
const {getBirthSchema} = require('./models/births');

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
  response.send('Welcome to NODE API!');
});

app.get('/births', getBirthSchema);

app.get('/unemployment_rate', getUnemploymentSchema);
app.post('/unemployment_rate', getFilteredUnemployment);

app.get('/education_preprimary', getPrePrimarySchema);
app.post('/education_preprimary', getFilteredPrePrimary);

app.listen(port, () => console.log(`Server running on: ${port}`));
