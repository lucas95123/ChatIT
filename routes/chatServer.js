var io = require('socket.io')();

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

exports.listen = function (_server) {
    return io.listen(_server);
};
