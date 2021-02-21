import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';

import {setAppRoutes, setInitialCountiesRoute} from './routes/routes.js';

const app = express();
const port = process.env.PORT || 2000;

app.set('port', port);
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}),
);

setInitialCountiesRoute(app);
setAppRoutes(app);
app.listen(port, () => console.log(`Server running on: ${port}`));
