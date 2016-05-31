var io = require('socket.io')();

io.on('connection', function(socket){
  console.log("A user connection");
  socket.emit('chatmessage', "欢迎来到无聊，快开始无聊吧")
  socket.on('chatmessage', function(msg){
    var mesg=eval('(' + msg + ')');
    console.log(mesg.uid);
    socket.broadcast.emit('chatsmessage', msg);
  });
  socket.on('debugmessage', function(msg) {
    console.log('========');
    console.log(msg);
    var mesg=eval('(' + msg + ')');
    console.log(mesg.user_name);
  })
});

exports.listen = function (_server) {
    return io.listen(_server);
};
