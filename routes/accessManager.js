var searchManager = require('./searchManager');

exports.signup = function(username, passwd, emailaddr, callback) {
    var sql = 'insert into AccountInfo values(';
    sql += 'null, ';
    sql += '\'' + username.trim() + '\', ';
    sql += '\'' + passwd.trim() + '\', ';
    sql += '\'' + emailaddr.trim() + '\', null, null, null)';
    searchManager.query(sql, function(qerr, vals) {
        callback(qerr);
    })
}

exports.login = function(username, passwd, callback) {
    var sql = 'select user_id from AccountInfo where user_name=';
    sql += '\'' + username.trim() + '\'and ';
    sql += 'passwd =';
    sql += '\'' + passwd.trim() + '\'';
    searchManager.query(sql, function(qerr, vals) {
        if (qerr) {
            callback(qerr);
            return;
        }
        if (vals[0] == undefined)
            qerr = 'Wrong passwd'
        callback(qerr, vals);
    })
}

exports.getinfo = function(uid, callback) {
    var sql = "select * from AccountInfo where user_id=" + uid;
    searchManager.query(sql, function(qerr, vals) {
        if (qerr) {
            callback(qerr);
            return;
        }
        callback(qerr, vals);
    })
}

exports.updateinfo = function(userid, username, motto, age, email, passwd, callback) {
    var sql = 'update AccountInfo set ';
    if (username != "")
        sql += 'user_name=\'' + username + '\' ';
    if (motto != "")
        sql += ',motto=\'' + motto + '\' ';
    if (age != "")
        sql += ',age=' + age + ' ';
    if (email != "")
        sql += ',email_addr=\'' + email + '\' ';
    if (passwd != "")
        sql += ',passwd=\'' + passwd + '\' ';
    sql += 'where user_id=' + userid;
    sql += ';';
    searchManager.query(sql, function(qerr, vals) {
        callback(qerr);
    });
}
