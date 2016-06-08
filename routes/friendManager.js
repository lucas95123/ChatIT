var searchManager = require('./searchManager');

exports.getFriends = function(user_id, callback) {
    sql = 'select B.user_id,A.user_id as friend_id,user_name,tag,email_addr,photo,motto,age from AccountInfo as A join FriendInfo as B where B.user_id='
    sql += user_id;
    sql += ' and A.user_id=B.friend_id order by tag;';
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

exports.addFriends = function(user_id, friend_id, callback) {
    sql = 'insert into FriendInfo values(';
    sql += user_id + ',';
    sql += friend_id + ', \'未分组\');';
    console.log(sql);
    searchManager.query(sql, function(qerr, vals) {
        sql = 'insert into FriendInfo values(';
        sql += friend_id + ',';
        sql += user_id + ', \'未分组\');';
        searchManager.query(sql, function(qerr, vals) {
            if (qerr) {
                callback(qerr);
                return;
            } else {
                callback(qerr, vals);
            }
        })
    })
}

exports.searchFriends = function(user_name, callback) {
    sql = 'select user_id,user_name,photo from AccountInfo where user_name like ';
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

exports.deleteFriends = function(user_id, friend_id, callback) {
    sql = 'delete from FriendInfo where user_id=';
    sql += user_id + ' and friend_id=';
    sql += friend_id + ';';
    console.log(sql);
    searchManager.query(sql, function(qerr, vals) {
        if (qerr) {
            callback(qerr);
            return;
        }
        sql = 'delete from FriendInfo where user_id=';
        sql += friend_id + ' and friend_id=';
        sql += user_id + ';';
        console.log(sql);
        searchManager.query(sql, function(qerr, vals) {
            if (qerr) {
                callback(qerr);
                return;
            } else {
                callback(qerr, vals);
            }
        })
    })
}

exports.changeTag = function(user_id, friend_id, tag, callback) {
    sql = 'update FriendInfo set tag=';
    sql += '\'' + tag + '\' where user_id=';
    sql += user_id + " and friend_id=";
    sql += friend_id;
    searchManager.query(sql, function(qerr, vals) {
        if (qerr) {
            callback(qerr);
            return;
        } else {
            callback(qerr, vals);
        }
    })
}

exports.findNameByID = function(fid, callback) {
    sql = "select user_name from AccountInfo where user_id=" + fid;
    console.log(sql);
    searchManager.query(sql, function(qerr, vals) {
        if (qerr) {
            callback(qerr);
            return;
        } else {
            callback(qerr, vals[0].user_name);
        }
    })
}

exports.findIDByName = function(fname, callback) {
    sql = "select user_id from AccountInfo where user_name=" + "\'" + fname + "\'";
    console.log(sql);
    searchManager.query(sql, function(qerr, vals) {
        if (qerr) {
            callback(qerr);
            return;
        } else {
            callback(qerr, vals[0].user_id);
        }
    })
}

exports.getAllFriendID = function(uid, callback) {
  sql = 'select A.user_id as friend_id,user_name from AccountInfo as A join FriendInfo as B where B.user_id='
  sql += uid;
  sql += ' and A.user_id=B.friend_id;';
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
