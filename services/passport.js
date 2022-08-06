// import or require the passport library.
const passport = require('passport');
// import or require the google oauth 2.0 strategy.
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//
const mongoose = require('mongoose');
//
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
     .then(user => {
        done(null, user);
     });
});

/*
new googleStrategy creates new instance of google oauth strategy
tells google strat how to authenticate users in this strategy

passport.use is generic register
*/
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        }, 
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id })
             .then((existingUser) => {
                if (existingUser) {
                    // we already have a record with the given profile id
                    done(null, existingUser);
                } else {
                    // we do not have a record with the given profile id
                    // make new user
                    new User({ googleId: profile.id })
                     .save()
                     .then(user => done(null, user));
                }
             });
        }
    )
);