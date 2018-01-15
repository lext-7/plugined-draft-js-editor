'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _prependHttp = require('prepend-http');

var _prependHttp2 = _interopRequireDefault(_prependHttp);

var _urlRegex = require('./urlRegex');

var _urlRegex2 = _interopRequireDefault(_urlRegex);

var _mailRegex = require('./mailRegex');

var _mailRegex2 = _interopRequireDefault(_mailRegex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  isUrl: function isUrl(text) {
    return (0, _urlRegex2.default)().test(text);
  },
  isMail: function isMail(text) {
    return (0, _mailRegex2.default)().test(text);
  },
  normaliseMail: function normaliseMail(email) {
    if (email.toLowerCase().startsWith('mailto:')) {
      return email;
    }
    return 'mailto:' + email;
  },
  normalizeUrl: function normalizeUrl(url) {
    return (0, _prependHttp2.default)(url);
  }
};