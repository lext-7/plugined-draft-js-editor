'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBlocksWhereEntityData = getBlocksWhereEntityData;
// Filter editorState's blockMap
function getBlocksWhereEntityData(editorState, filter) {
  var contentState = editorState.getCurrentContent();
  return contentState.get('blockMap').filter(function (block) {
    var entityData = block.getEntityAt(0) ? contentState.getEntity(block.getEntityAt(0)).getData() : null;
    return entityData && filter(entityData);
  });
}