// import or require the express library
const express = require('express');
 
/* creates a unique express application
used to listen to incoming requests and route to express side via node side
then route to route handlers
*/
const app = express();

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
app.get('/', (req, res) =>  {
    res.send({ hi: 'there'});
});

/*
when heroku runs our app it can inject environment variables
*/
const PORT = process.env.PORT || 5000;

/*
instructs express to tell node that express wants to listen to incoming traddic on port 5000
*/
app.listen(PORT);
