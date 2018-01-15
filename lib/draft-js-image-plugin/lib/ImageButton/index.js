'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createImageButton = require('./createImageButton');

var _createImageButton2 = _interopRequireDefault(_createImageButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createImageButton2.default)({
  children: _react2.default.createElement(
    'svg',
    { width: '24', height: '24', viewBox: '0 0 24 24' },
    _react2.default.createElement('path', {
      fill: 'currentColor',
      fillRule: 'evenodd',
      d: 'M18.222 6H5.778C4.8 6 4 6.6 4 7.333v9.334C4 17.4 4.8 18 5.778 18h12.444C19.2 18 20 17.4 20 16.667V7.333C20 6.6 19.2 6 18.222 6zm-4.084 4l-3 4.51L9 11.503 6 16h12l-3.862-6z'
    })
  )
});