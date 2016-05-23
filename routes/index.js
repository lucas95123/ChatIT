var express = require('express');
var accessManager = require('./accessManager');
var router = express.Router();

function signup(req, res) {
    res.render('chatit_signup');
}

/* GET home page. */
router.get('/', function(req, res) {
    res.render('chatit_login');
})

router.get('/login', function(req, res) {
    res.render('chatit_login');
})

router.post('/login', function(req, res) {
    console.log(req);
    console.log(req.body.btnpressed);
    accessManager.login(req.body.username, req.body.passwd, function(err) {
        if (err) {
            res.render('error', {
                error: err
            });
        } else {
            res.render('chatit_friends');
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

router.get('/friends', function(req, res, next) {
    res.render('chatit_friends');
})

router.get('/chat', function(req, res, next) {
    res.render('chatit_chat');
})

router.get('/personalinfo', function(req, res, next) {
    res.render('chatit_personalinfo');
})

router.get('/logout', function(req, res, next) {
    res.render('chatit_login');
})

router.get('/bootstrap', function(req, res) {
    res.render('buttons');
})

router.get('/chatorigin', function(req, res) {
    res.sendFile(__dirname+'/chatit_box.html');
})

module.exports = router;
