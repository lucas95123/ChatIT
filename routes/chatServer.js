var io = require('socket.io')();

var socketMap = new Map();

log = function(msg, sender) {
    console.log("==============from: " + sender + "==============");
    console.log(msg);
    console.log("==============end==============");
}

function showOnlineUsers() {
    console.log("======online users======");
    for (fid in socketMap)
        console.log("user:" + fid);
    console.log("========================");
}

io.on('connection', function(socket) {
    console.log("A user connection");
    showOnlineUsers();

    socket.on('chatmessage', function(msg) {
        var mesg = eval('(' + msg + ')');
        console.log(mesg);
        if (mesg.msg == "debug") {
            console.log(socketMap[mesg.uid]);
        }
        if (socketMap[mesg.fid] == undefined)
            socketMap[mesg.uid].emit("chatmessage", "Friend Offline")
        else
            socketMap[mesg.fid].emit('chatmessage', mesg.msg);
    });

    socket.on('debugmessage', function(msg) {
        log(msg, "debugmessage");
        showOnlineUsers();
    })

    socket.on('identification', function(msg) {
        socketMap[msg] = socket;
        log("user:" + msg + " connected", "identification msg");

    })
});

exports.listen = function(_server) {
    return io.listen(_server);
};
