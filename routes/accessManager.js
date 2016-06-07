var searchManager = require('./searchManager');
var formidable = require('formidable');
var fs = require('fs');
var gm = require('gm');
var imageMagick = gm.subClass({
    imageMagick: true
});
AVATAR_UPLOAD_FOLDER = '/avatar/'

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

exports.uploadpic = function(req, callback) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.parse(req, function(err, fields, files) {
        if (err) {
            callback(err);
        }

        var extName = '';
        switch (files.fulAvatar.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }

        if (extName.length == 0) {
            callback(err);
        }

        var newPath = form.uploadDir + req.session.userid + '.' + extName;
        var newPathSmall = form.uploadDir + req.session.userid + '_small.' + extName;
        var sql="update AccountInfo set photo=\'/avatar/"+req.session.userid+"\' where user_id="+req.session.userid;
        searchManager.query(sql);

        fs.rename(files.fulAvatar.path, newPath, function(err) {
            if (err) {
                callback(err);
                return;
            }
            imageMagick(newPath)
                .resize(140, 140, '!')
                .autoOrient()
                .write(newPath, function(err) {
                    imageMagick(newPath)
                        .resize(70, 70, '!')
                        .autoOrient()
                        .write(newPathSmall, function(err) {
                            if (err) {
                                callback(err);
                                return err;
                            }
                            callback(err);
                        });
                });
        });
    });
}
