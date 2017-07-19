'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _admin = require('./routes/admin');

var _admin2 = _interopRequireDefault(_admin);

var _accounts = require('./routes/accounts');

var _accounts2 = _interopRequireDefault(_accounts);

var _auth = require('./routes/auth');

var _auth2 = _interopRequireDefault(_auth);

var _checkout = require('./routes/checkout');

var _checkout2 = _interopRequireDefault(_checkout);

var _socket = require('socket.io');

var _socketConnection = require('./libs/socketConnection');

var _socketConnection2 = _interopRequireDefault(_socketConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config(); // LOAD CONFIG


var app = (0, _express2.default)();

var port = 3000;

/*
import Sequelize from 'sequelize';

const sequelize = new Sequelize( process.env.DATABASE , process.env.DB_USER , process.env.DB_PASSWORD , {
  host:  process.env.DB_HOST ,
  dialect: 'mssql',
  dialectOptions: {
    encrypt: true,
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  port : 80
});

sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});
*/

// DB authentication
_models2.default.sequelize.authenticate().then(function () {
    console.log('Connection has been established successfully.');
    return _models2.default.sequelize.sync();
}).then(function () {
    console.log('DB Sync complete.');
}).catch(function (err) {
    console.error('Unable to connect to the database:', err);
});

// logger
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _cookieParser2.default)()); //이부분 삽입

// SERVE STATIC FILES - REACT PROJECT
app.use('/', _express2.default.static(_path2.default.join(__dirname, '../public')));

//업로드 path 추가
app.use('/uploads', _express2.default.static(_path2.default.join(__dirname, '../uploads'))

//session 관련 셋팅----------------------------------------
);app.use((0, _expressSession2.default)({
    secret: 'ebay',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 2000 * 60 * 60 //지속시간 2시간
    }
}));

//passport 적용
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

//-------------------------------------------------------------

//라우팅
app.use('/api/admin', _admin2.default);
app.use('/api/accounts', _accounts2.default);
app.use('/api/auth', _auth2.default);
app.use('/api/checkout', _checkout2.default);

app.get('*', function (req, res) {
    res.sendFile(_path2.default.resolve(__dirname, '../public', 'index.html'));
});

app.get('/', function (req, res) {
    res.send('Es6 export Import11111');
});

var server = app.listen(port, function () {
    console.log('Express listening on port', port);
});

var io = (0, _socket.listen)(server);
(0, _socketConnection2.default)(io);