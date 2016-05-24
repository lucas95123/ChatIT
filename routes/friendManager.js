var searchManager = require('./searchManager');

exports.getFriends = function(user_id, callback) {
    sql = 'select friend_id,tag from FriendInfo where user_id=';
    sql += user_id;
    searchManager.query(sql, function(qerr, vals) {
        if (qerr) {
            callback(qerr);
            return;
        } else {
            callback(qerr, vals);
        }
    })
}

exports.addFriends = function(user_id, friend_id, callback) {
    sql = 'insert into FriendInfo values(';
    sql += user_id + ',';
    sql += friend_id + ', \'未分组\');';
    console.log(sql);
    searchManager.query(sql, function(qerr, vals) {
        if (qerr) {
            callback(qerr);
            return;
        } else {
            callback(qerr, vals);
        }
    })
}

exports.searchFriends = function(user_name, callback) {
    sql = 'select user_id,user_name from AccountInfo where user_name like ';
    sql += '\'%' + user_name.trim() + '%\';';
    console.log(sql);
    searchManager.query(sql, function(qerr, vals) {
        if (qerr) {
            callback(qerr);
            return;
        } else {
            callback(qerr, vals);
        }
    })
}
