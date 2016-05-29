var express = require('express')
var accessManager = require('./accessManager');
var friendManager = require('./friendManager');
var router = express.Router();

var renderFriendPage = function(req, res) {
    friendManager.getFriends(req.session.userid, function(err, vals) {
        if (!err) {
            console.log(vals);
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
                username: req.session.username
            })
        } else {
            res.render('error', {
                error: err
            });
        }
    })
}

var login = function(req, res) {
    console.log(req.session);
    if (req.session.username != undefined || req.session.username != null)
        renderFriendPage(req, res);
    else
        res.render('chatit_login');
}

/* GET home page. */
router.get('/', login);

router.get('/login', login)

router.post('/login', function(req, res) {
    accessManager.login(req.body.username, req.body.passwd, function(err, vals) {
        if (err) {
            res.render('error', {
                error: err
            });
        } else {
            req.session.username = req.body.username;
            req.session.passwd = req.body.passwd;
            console.log(vals[0].user_id);
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
        res.render('chatit_login');
    else
        res.render('chatit_chat',{username: req.session.username});
})

router.get('/personalinfo', function(req, res, next) {
    if (req.session.username == undefined || req.session.username == null)
        res.render('chatit_login');
    else
        res.render('chatit_info');
})

router.get('/logout', function(req, res, next) {
    if (req.session.username == undefined || req.session.username == null)
        res.render('chatit_login');
    else {
        req.session.username = undefined;
        req.session.passwd = undefined;
    }
    res.render('chatit_login');
})

router.get('/bootstrap', function(req, res) {
    res.render('buttons');
})

router.get('/test', function(req, res) {
    var vals = [{
        'user_name': 'lk'
    }, {
        'user_name': 'nf'
    }]
    console.log(vals[0].user_name);
    res.render('chatit_addfriend', {
        user: vals,
        username: req.session.username
    });
})

router.get('/chatorigin', function(req, res) {
    res.sendFile(__dirname + '/chatit_box.html');
})

module.exports = router;
