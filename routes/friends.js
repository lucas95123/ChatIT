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
            console.log(friendsinfo);
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

router.get('/', function(req, res, next) {
    if (req.session.username == undefined || req.session.username == null)
        res.render('chatit_login');
    else
        renderFriendPage(req, res);
})

router.get('/searchfriends', function(req, res, next) {
    if (req.session.username == undefined || req.session.username == null)
        res.render('chatit_login');
    else {
        var vals = [];
        res.render('chatit_addfriend', {
            user: vals,
            username: req.session.username
        });
    }
})

router.post('/searchfriends', function(req, res, next) {
    friendManager.searchFriends(req.body.user_name, function(err, vals) {
        console.log(vals);
        res.render('chatit_addfriend', {
            user: vals,
            username: req.session.username
        })
    })
})

router.get('/addfriends', function(req, res) {
    if (req.session.username == undefined || req.session.username == null)
        res.render('chatit_login');
    else {
        friendManager.addFriends(req.session.userid, req.query.user_id, function(err) {
            if (!err) {
                res.redirect('./searchfriends');
            } else {
                res.render('error', {
                    error: err
                });
            }
        })
    }
})

module.exports = router;
