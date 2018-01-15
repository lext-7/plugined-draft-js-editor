'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YOUTUBE_PREFIX = 'https://www.youtube.com/embed/';
var VIMEO_PREFIX = 'https://player.vimeo.com/video/';

var defaultGetSrc = function defaultGetSrc(_ref) {
  var src = _ref.src;
  var isYoutube = _utils2.default.isYoutube,
      getYoutubeSrc = _utils2.default.getYoutubeSrc,
      isVimeo = _utils2.default.isVimeo,
      getVimeoSrc = _utils2.default.getVimeoSrc;

  if (isYoutube(src)) {
    var _getYoutubeSrc = getYoutubeSrc(src),
        srcID = _getYoutubeSrc.srcID;

    return '' + YOUTUBE_PREFIX + srcID;
  }
  if (isVimeo(src)) {
    var _getVimeoSrc = getVimeoSrc(src),
        _srcID = _getVimeoSrc.srcID;

    return '' + VIMEO_PREFIX + _srcID;
  }
  return undefined;
};

var DefaultVideoCompoent = function DefaultVideoCompoent(_ref2) {
  var blockProps = _ref2.blockProps,
      _ref2$className = _ref2.className,
      className = _ref2$className === undefined ? '' : _ref2$className,
      style = _ref2.style,
      theme = _ref2.theme,
      _ref2$getSrc = _ref2.getSrc,
      getSrc = _ref2$getSrc === undefined ? defaultGetSrc : _ref2$getSrc;

  var src = getSrc(blockProps);
  if (src) {
    return _react2.default.createElement(
      'div',
      { style: style },
      _react2.default.createElement(
        'div',
        { className: theme.iframeContainer + ' ' + className },
        _react2.default.createElement('iframe', {
          className: theme.iframe,
          src: src,
          frameBorder: '0',
          allowFullScreen: true
        })
      )
    );
  }

  return _react2.default.createElement(
    'div',
    { className: theme.invalidVideoSrc },
    'invalid video source'
  );
};

DefaultVideoCompoent.propTypes = {
  blockProps: _propTypes2.default.object.isRequired,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  theme: _propTypes2.default.object.isRequired
};
exports.default = DefaultVideoCompoent;