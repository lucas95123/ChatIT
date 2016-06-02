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
    socket.emit('chatmessage', "Welcome to ChatIT");    

    socket.on('chatmessage', function(msg) {
         showOnlineUsers();
        var mesg = eval('(' + msg + ')');
        if (mesg.msg == "debug") {
            console.log(socketMap);
        }
        if (socketMap[mesg.fid] == undefined)
            socketMap[mesg.uid].emit("infomessage", "Friend Offline")
        else {
            socketMap[mesg.fid].emit('chatmessage', mesg.msg, mesg.uid);
        }
    });

    socket.on('debugmessage', function(msg) {
        log(msg, "debugmessage");
        showOnlineUsers();
    })

    socket.on('identification', function(msg) {
        socketMap[msg] = socket;
        log("user:" + msg + " connected", "identification msg");
    })

    socket.on('userexit', function(uid) {
        msgqueue.remove(uid);
    })
});

exports.listen = function(_server) {
    return io.listen(_server);
};
