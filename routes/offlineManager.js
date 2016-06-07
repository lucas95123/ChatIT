var searchManager = require('./searchManager');

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
    return currentdate;
}

exports.insertOfflineMsg = function(sender, receiver, mesg) {
    var sql = "insert into OfflineMessage values(";
    sql += sender + ", ";
    sql += receiver + ", ";
    sql += "\'" + mesg + "\', ";
    sql += "\'" + getNowFormatDate() + "\')";
    searchManager.query(sql);
}

exports.getOfflineMsg = function(id, callback) {
    var sql = "select * from OfflineMessage where target_id=" + id;
    searchManager.query(sql, function(qerr, vals) {
        if (qerr) {
            callback(qerr,{});
            return;
        } else {
            callback(qerr, vals);
        }
    })
}

exports.deleteOfflineMsg = function(id) {
    var sql = "delete from OfflineMessage where target_id=" + id;
    searchManager.query(sql)
}
