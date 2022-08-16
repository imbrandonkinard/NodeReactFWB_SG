const passport = require('passport');

module.exports = (app) => {

    /*
    app -   indicates underlying express app
    app.get -   creates new route handler
    get -   creates route handler watching for http method
        -   gets info
    '/' -   specifies directory
    req -   represents incoming request
    res -   represents outbound response
    res.send    -   data to send
    */

    /*
    Deleted below code segment. Served more as test route.
    */

    // app.get('/', (req, res) =>  {
    //     res.send({ just: 'chilling'});
    // });

    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            // scope specifices what access we have in google profile
            scope:['profile', 'email']
        })
    );

    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

};