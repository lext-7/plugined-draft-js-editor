'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createInlineStyleButton = require('../../utils/createInlineStyleButton');

var _createInlineStyleButton2 = _interopRequireDefault(_createInlineStyleButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createInlineStyleButton2.default)({
  style: 'SUBSCRIPT',
  children: _react2.default.createElement(
    'div',
    null,
    'x',
    _react2.default.createElement(
      'sub',
      null,
      '2'
    )
  )
});