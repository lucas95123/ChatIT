var io = require('socket.io')();

log = function(msg, sender) {
    console.log("==============from: " + sender + "==============");
    console.log(msg);
    console.log("==============end==============");
}

io.on('connection', function(socket) {
    console.log("A user connection");
    socket.on('chatmessage', function(msg) {
        var mesg = eval('(' + msg + ')');
        console.log(mesg.uid);
        socket.broadcast.emit('chatsmessage', msg);
    });
    socket.on('debugmessage', function(msg) {
        log(msg, "debugmessage")
    })
});

exports.listen = function(_server) {
    return io.listen(_server);
};
