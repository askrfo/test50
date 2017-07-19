'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mysalt = "ebay";

exports.default = function (password) {
    return _crypto2.default.createHash('sha512').update(password + mysalt).digest('base64');
};