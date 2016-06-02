var io = require('socket.io')();

var socketMap = new Array();

log = function(msg, sender) {
    console.log("==============from: " + sender + "==============");
    console.log(msg);
    console.log("==============end==============");
}

io.on('connection', function(socket) {
    console.log("A user connection");

    socket.on('chatmessage', function(msg) {
        var mesg = eval('(' + msg + ')');
        console.log(mesg);
        if (mesg.msg == "debug") {
            console.log(socketMap[mesg.uid]);
        }
        if(socketMap[mesg.fid]==undefined)
          socketMap[mesg.uid].emit("chatmessage", "Friend Offline")
        else
          socketMap[mesg.fid].emit('chatmessage', mesg.msg);
    });

    socket.on('debugmessage', function(msg) {
        log(msg, "debugmessage");
    })

    socket.on('identification', function(msg) {
        log(msg, "identification msg");
        socketMap[msg] = socket;
    })
});

exports.listen = function(_server) {
    return io.listen(_server);
};
