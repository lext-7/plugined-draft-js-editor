'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

exports.default = {
  createLinkAtSelection: function createLinkAtSelection(editorState, url) {
    var contentState = editorState.getCurrentContent().createEntity('LINK', 'MUTABLE', { url: url });
    var entityKey = contentState.getLastCreatedEntityKey();
    var withLink = _draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey);
    return _draftJs.EditorState.forceSelection(withLink, editorState.getSelection());
  },
  removeLinkAtSelection: function removeLinkAtSelection(editorState) {
    var selection = editorState.getSelection();
    return _draftJs.RichUtils.toggleLink(editorState, selection, null);
  },
  getCurrentEntityKey: function getCurrentEntityKey(editorState) {
    var selection = editorState.getSelection();
    var anchorKey = selection.getAnchorKey();
    var contentState = editorState.getCurrentContent();
    var anchorBlock = contentState.getBlockForKey(anchorKey);
    var offset = selection.anchorOffset;
    var index = selection.isBackward ? offset - 1 : offset;
    return anchorBlock.getEntityAt(index);
  },
  getCurrentEntity: function getCurrentEntity(editorState) {
    var contentState = editorState.getCurrentContent();
    var entityKey = this.getCurrentEntityKey(editorState);
    return entityKey ? contentState.getEntity(entityKey) : null;
  },
  hasEntity: function hasEntity(editorState, entityType) {
    var entity = this.getCurrentEntity(editorState);
    return entity && entity.getType() === entityType;
  }
};