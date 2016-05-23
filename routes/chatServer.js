var io = require('socket.io')();

io.on('connection', function(socket){
  console.log("A user connection");
  socket.emit('chat message', "欢迎来到无聊，快开始无聊吧")
  socket.on('chat message', function(msg){
    console.log(msg);
    socket.broadcast.emit('chat message', msg);
  });
});

exports.listen = function (_server) {
    return io.listen(_server);
};
