var searchManager = require('./searchManager');

exports.signup = function(username, passwd, emailaddr, callback) {
    var sql = 'insert into AccountInfo values(';
    sql += 'null, ';
    sql += '\'' + username.trim() + '\', ';
    sql += '\'' + passwd.trim() + '\', ';
    sql += '\'' + emailaddr.trim() + '\', ';
    sql += 'FALSE);'
    searchManager.query(sql, function(qerr, vals) {
        callback(qerr);
    })
}

exports.login = function(username, passwd, callback) {
  var sql = 'select user_id from AccountInfo where user_name=';
  sql+='\'' + username.trim() + '\'and ';
  sql+='passwd =';
  sql+='\'' + passwd.trim() + '\'';
  searchManager.query(sql, function(qerr, vals) {
    if(qerr){
      callback(qerr);
      return;
    }
    if(vals[0]==undefined)
      qerr='Wrong passwd'
    callback(qerr, vals);
  })
}
