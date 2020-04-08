const express = require("express");
const bodyParser = require("body-parser");
var fs = require("fs");
const app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var dateFormat = require('dateformat');

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

io.on('connection', function (socket){
    var time = dateFormat();
    console.log('A user is connected');
    io.sockets.emit('message', time + " - USER joined the room.");

    socket.on('disconnect', function (){
        var time = dateFormat();
        console.log('A user is disconnected');
        io.sockets.emit('message', time + " - USER left the room.");
    });

    socket.on('new-message', function (message){
        var time = dateFormat();
        //console.log(time);
        console.log(time + ' - New message :' + message);
        io.sockets.emit('message', time + " - USER : " + message);
    });

    //console.log(socket.room);
});

// set port, listen for requests
http.listen(3000, () => {
    console.log("Server is running on port 3000.");
    const all_routes = require('express-list-endpoints');
    console.log(all_routes(app));
});
