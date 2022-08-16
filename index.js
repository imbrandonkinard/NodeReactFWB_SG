// import or require the express library.
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require ('body-parser');
const keys = require('./config/keys');
const { default: App } = require('./client/src/components/App');

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
app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes.js')(app);
require('./routes/billingRoutes.js')(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));

    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

/*
when heroku runs our app it can inject environment variables
*/
const PORT = process.env.PORT || 5000;

/*
instructs express to tell node that express wants to listen to incoming traddic on port 5000
*/
app.listen(PORT);
