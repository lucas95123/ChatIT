//searchManager.js
var mysql = require("mysql");
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', //'lucas95123',
    database: 'chatit',

});

exports.query = function(sql, callback, req, res) {
    pool.getConnection(function(err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, function(qerr, vals, fields) {
                //release connection
                conn.release();
                //Event driven callback
                if (callback != null)
                    callback(qerr, vals, fields);
            });
        }
    });
};
