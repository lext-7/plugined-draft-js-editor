'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addVideo;

var _draftJs = require('draft-js');

var _constants = require('../constants');

var types = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function addVideo(editorState, _ref) {
  var src = _ref.src;

  if (_draftJs.RichUtils.getCurrentBlockType(editorState) === types.ATOMIC) {
    return editorState;
  }
  var contentState = editorState.getCurrentContent();
  var contentStateWithEntity = contentState.createEntity(types.VIDEOTYPE, 'IMMUTABLE', { src: src });
  var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  return _draftJs.AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
}