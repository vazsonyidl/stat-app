const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const {setAppRoutes} = require('./routes/routes');

const app = express();
const port = process.env.PORT || 2000;
setAppRoutes(app);

app.set('port', port);
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }),
);

app.listen(port, () => console.log(`Server running on: ${port}`));
