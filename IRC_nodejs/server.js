const express = require("express");
const bodyParser = require("body-parser");
var fs = require("fs");
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

require("./app/routes/routes.js")(app);
// set port, listen for requests
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
    const all_routes = require('express-list-endpoints');
    console.log(all_routes(app));
});
