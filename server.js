require("babel-register"); //Enable ES6 support in Node.JS

var express = require('express');
var app = express();

var CONSTANTS = require('./src/constants.js').default;

var http = require('http').Server(app);
var io = require('socket.io')(http);

var engine = new (require('./engine.js').default)(io);


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.emit('action', {type:CONSTANTS.games.UPDATE, payload:engine.games})
  socket.on('action', function(message){
    engine.handleRequest(socket, message.type.substring(7), message.payload);
  });
});

http.listen(app.get('port'), function(){
  console.log('Node app is running on port', app.get('port'));
});
