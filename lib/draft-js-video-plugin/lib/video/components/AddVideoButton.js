'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createAddVideoButton = require('./createAddVideoButton');

var _createAddVideoButton2 = _interopRequireDefault(_createAddVideoButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/no-children-prop */
exports.default = (0, _createAddVideoButton2.default)({
  children: _react2.default.createElement(
    'svg',
    { width: '24', height: '24' },
    _react2.default.createElement('path', { fill: 'currentColor', d: 'M10 9v6l5-3-5-3zm8.222-3H5.778C4.8 6 4 6.6 4 7.333v9.334C4 17.4 4.8 18 5.778 18h12.444C19.2 18 20 17.4 20 16.667V7.333C20 6.6 19.2 6 18.222 6z', fillRule: 'evenodd' })
  )
});