// import or require the express library.
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

// require the model class for users
require('./models/User.js');
// require the passport configuration in passport.js
require('./services/passport.js');

mongoose.connect(keys.mongoURI);

/* creates a unique express application
used to listen to incoming requests and route to express side via node side
then route to route handlers
*/
const app = express();

/*
Middleware
*/
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes.js')(app);

/*
when heroku runs our app it can inject environment variables
*/
const PORT = process.env.PORT || 5000;

/*
instructs express to tell node that express wants to listen to incoming traddic on port 5000
*/
app.listen(PORT);
