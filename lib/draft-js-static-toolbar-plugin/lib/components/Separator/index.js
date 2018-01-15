'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _separatorStyles = {
  "separator": "draftJsToolbar__separator__3U7qt"
};

var _separatorStyles2 = _interopRequireDefault(_separatorStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === undefined ? _separatorStyles2.default.separator : _ref$className;
  return _react2.default.createElement('div', { className: className });
};