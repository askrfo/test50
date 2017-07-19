'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passwordHash = require('../libs/passwordHash');

var _passwordHash2 = _interopRequireDefault(_passwordHash);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_passport2.default.serializeUser(function (user, done) {
    console.log('serializeUser');
    done(null, user);
});

_passport2.default.deserializeUser(function (user, done) {
    console.log('deserializeUser');
    done(null, user);
});

_passport2.default.use(new _passportLocal.Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, username, password, done) {
    _models2.default.Users.findOne({
        where: {
            username: username,
            password: (0, _passwordHash2.default)(password)
        }
    }).then(function (user) {
        if (!user) {
            return done(null, false, { message: '아이디 또는 비밀번호 오류 입니다.' });
        } else {
            return done(null, user.dataValues);
        }
    });
}));

var router = _express2.default.Router();

router.post('/join', function (req, res) {
    _models2.default.Users.create({
        username: req.body.username,
        password: (0, _passwordHash2.default)(req.body.password),
        displayname: req.body.displayname
    }).then(function () {
        res.json({ message: "success" });
    });
});

router.post('/login', function (req, res, next) {
    _passport2.default.authenticate('local', function (err, user, info) {
        if (!user) {
            return res.json({ message: info.message });
        }
        req.logIn(user, function (err) {
            return res.json({ message: "success" });
        });
    })(req, res, next);
});

router.get('/success', function (req, res) {
    res.send(req.user);
});

router.get('/status', function (req, res) {
    res.json({ isLogin: req.isAuthenticated() });
});

/*
router.get('/logout', function(req, res){
    req.logout();
    res.send('<script>alert("로그아웃 되었습니다. 메인페이지로 이동합니다");location.href="/";</script>');
});
*/
router.get('/logout', function (req, res) {
    req.logout();
    res.json({
        message: "success"
    });
});

exports.default = router;