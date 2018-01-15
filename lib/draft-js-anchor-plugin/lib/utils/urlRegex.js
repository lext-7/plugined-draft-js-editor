'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tlds = require('tlds');

var _tlds2 = _interopRequireDefault(_tlds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var v4 = '(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}'; /* eslint-disable  arrow-body-style */
/* eslint-disable  no-confusing-arrow */

var v6seg = '[0-9a-fA-F]{1,4}';
var v6 = ('\n(\n(?:' + v6seg + ':){7}(?:' + v6seg + '|:)|                                // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8\n(?:' + v6seg + ':){6}(?:' + v4 + '|:' + v6seg + '|:)|                         // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4\n(?:' + v6seg + ':){5}(?::' + v4 + '|(:' + v6seg + '){1,2}|:)|                 // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4\n(?:' + v6seg + ':){4}(?:(:' + v6seg + '){0,1}:' + v4 + '|(:' + v6seg + '){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4\n(?:' + v6seg + ':){3}(?:(:' + v6seg + '){0,2}:' + v4 + '|(:' + v6seg + '){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4\n(?:' + v6seg + ':){2}(?:(:' + v6seg + '){0,3}:' + v4 + '|(:' + v6seg + '){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4\n(?:' + v6seg + ':){1}(?:(:' + v6seg + '){0,4}:' + v4 + '|(:' + v6seg + '){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4\n(?::((?::' + v6seg + '){0,5}:' + v4 + '|(?::' + v6seg + '){1,7}|:))           // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4\n)(%[0-9a-zA-Z]{1,})?                                           // %eth0            %1\n').replace(/\s*\/\/.*$/gm, '').replace(/\n/g, '').trim();

var ipRegex = function ipRegex(opts) {
  return opts && opts.exact ? new RegExp('(?:^' + v4 + '$)|(?:^' + v6 + '$)') : new RegExp('(?:' + v4 + ')|(?:' + v6 + ')', 'g');
};

ipRegex.v4 = function (opts) {
  return opts && opts.exact ? new RegExp('^' + v4 + '$') : new RegExp(v4, 'g');
};
ipRegex.v6 = function (opts) {
  return opts && opts.exact ? new RegExp('^' + v6 + '$') : new RegExp(v6, 'g');
};

exports.default = function (_opts) {
  var opts = Object.assign({ strict: true }, _opts);
  var protocol = '(?:(?:[a-z]+:)?//)' + (opts.strict ? '' : '?');
  var auth = '(?:\\S+(?::\\S*)?@)?';
  var ip = ipRegex.v4().source;
  var host = '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)';
  var domain = '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*';
  var tld = '(?:\\.' + (opts.strict ? '(?:[a-z\\u00a1-\\uffff]{2,})' : '(?:' + _tlds2.default.sort(function (a, b) {
    return b.length - a.length;
  }).join('|') + ')') + ')\\.?';
  var port = '(?::\\d{2,5})?';
  var path = '(?:[/?#][^\\s"]*)?';
  var regex = '(?:' + protocol + '|www\\.)' + auth + '(?:localhost|' + ip + '|' + host + domain + tld + ')' + port + path;

  return opts.exact ? new RegExp('(?:^' + regex + '$)', 'i') : new RegExp(regex, 'ig');
};