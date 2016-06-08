var io = require('socket.io')();
var offlineManager = require('./offlineManager');
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
    socket.emit('systemmessage', 'Welcome to ChatIT');
    socket.on('chatmessage', function(msg) {
        console.log(msg);
        var mesg = eval('(' + msg + ')');
        if (socketMap[mesg.fid] == undefined || socketMap[mesg.fid].connected == false) {
            console.log("friend not online");
            offlineManager.insertOfflineMsg(mesg.uid, mesg.fid, unescape(mesg.msg));
        } else {
            socketMap[mesg.fid].emit('chatmessage', mesg.msg, mesg.uid);
        }
    });

    socket.on('debugmessage', function(msg) {
        log(unescape(msg), "debugmessage");
    })

    socket.on('identification', function(uid) {
        socketMap[uid] = socket;
    })

    socket.on('userenter', function(uid) {
        socketMap[uid] = socket;
        log("user:" + uid + " connected", "identification msg");
        offlineManager.getOfflineMsg(uid, function(err, vals) {
            if (!err) {
                console.log(uid+":sending offline messages");
                for (var i = 0; i < vals.length; i++) {
                    console.log(vals[i].message);
                    socket.emit('chatmessage', vals[i].message, vals[i].user_id, vals[i].time_stamp)
                }
                offlineManager.deleteOfflineMsg(uid);
            }
        })
    })

    socket.on('userexit', function(uid) {
        msgqueue.remove(uid);
    })
});

exports.listen = function(_server) {
    return io.listen(_server);
};
