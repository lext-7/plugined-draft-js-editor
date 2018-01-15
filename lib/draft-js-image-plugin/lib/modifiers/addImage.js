'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _draftJs = require('draft-js');

exports.default = function (editorState, url, extraData) {
  var urlType = 'image';
  var contentState = editorState.getCurrentContent();
  var contentStateWithEntity = contentState.createEntity(urlType, 'IMMUTABLE', _extends({}, extraData, { src: url }));
  var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  var newEditorState = _draftJs.AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
  return _draftJs.EditorState.forceSelection(newEditorState, newEditorState.getCurrentContent().getSelectionAfter());
};