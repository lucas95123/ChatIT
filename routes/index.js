var express = require('express')
var accessManager = require('./accessManager');
var friendManager = require('./friendManager');
var router = express.Router();

var renderFriendPage = function(req, res) {
    friendManager.getFriends(req.session.userid, function(err, vals) {
        if (!err) {
            var friendsinfo = new Array();
            var count_tag = -1;
            var name_tag = "";
            var j = 0;
            for (var i = 0; i < vals.length; i++) {
                if (vals[i].tag != name_tag) {
                    j = 0;
                    count_tag += 1;
                    name_tag = vals[i].tag;
                    friendsinfo[count_tag] = new Array();
                }
                friendsinfo[count_tag][j] = vals[i];
                j += 1;
            }
            res.render('chatit_friends', {
                friends: friendsinfo,
                username: req.session.username,
                userid: req.session.userid
            })
        } else {
            res.render('error', {
                error: err
            });
        }
    })
}

var login = function(req, res) {
    if (req.session.username != undefined || req.session.username != null) {
        renderFriendPage(req, res);
    } else if (req.cookies['userinfo'] != undefined) {
        req.session.username = req.cookies['userinfo'].user_name;
        req.session.passwd = req.cookies['userinfo'].passwd;
        req.session.userid = req.cookies['userinfo'].user_id;
        renderFriendPage(req, res);
    } else
        res.render('chatit_login');
}

router.post('/book', function(req, res){
   console.log("post received");
	console.log(req.body);
})

router.get('/book', function(req, res){
    console.log("get reveived");
    console.log(req.body);
})

/* GET home page. */
router.get('/', login);

router.post('/testEmbed', function(req, res){
	console.log("================");
	console.log(req.body);
	res.render('chatit_signup');
}) 

router.get('/login', login)

router.post('/login', function(req, res) {
    accessManager.login(req.body.username, req.body.passwd, function(err, vals) {
        if (err) {
            res.render('error', {
                error: err
            });
        } else {
            if (req.body.remember == 'yes') {
                res.cookie('userinfo', {
                    user_name: req.body.username,
                    passwd: req.body.passwd,
                    user_id: vals[0].user_id
                });
            } else {
                res.clearCookie('userinfo');
            }
            req.session.username = req.body.username;
            req.session.passwd = req.body.passwd;
            req.session.userid = vals[0].user_id;
            renderFriendPage(req, res);
        }
    });
})

router.post('/signup', function(req, res) {
    accessManager.signup(req.body.username, req.body.passwd, req.body.email, function(err) {
        if (err) {
            res.render('error', {
                error: err
            });
        } else {
            res.render('chatit_login');
        }
    })
})

router.get('/signup', function(req, res, next) {
    res.render('chatit_signup');
})

router.get('/chat', function(req, res, next) {
    if (req.session.username == undefined || req.session.username == null)
        res.redirect("/login");
    else
        res.render('chatit_chat', {
            username: req.session.username,
            userid: req.session.userid,
            friendid: req.query.friend_id,
            friendname: req.query.friend_name
        });
})

router.get('/personalinfo', function(req, res, next) {
    if (req.session.username == undefined || req.session.username == null)
        res.redirect("/login");
    else
        res.render('chatit_info', {
            username: req.session.username
        });
})

router.get('/logout', function(req, res, next) {
    res.clearCookie('userinfo');
    res.clearCookie('msgqueue');
    req.session.username = undefined;
    req.session.passwd = undefined;
    res.render('chatit_login');
})

module.exports = router;
