//Import express framework module
var express = require('express');
//Create app
var app = express();
//Listen on port 3000
var server = app.listen(3000);
//App will host everything in the public directory
app.use(express.static('public'));

console.log("server is running!")


var socket = require('socket.io');
var io = socket(server);
//handle new connection event
io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log('socket connected: ' + socket.id);

  socket.on('mouse', mouseMessage);

  function mouseMessage(data) {
    //When message comes in to the server, send it back out to all clients (not inc. original)
    socket.broadcast.emit('mouse', data);
    //When message comes in to the server, send it back out to ALL clients (refs. global io object)
    // io.sockets.emit('mouse', data);
    console.log(data);
  }
}
