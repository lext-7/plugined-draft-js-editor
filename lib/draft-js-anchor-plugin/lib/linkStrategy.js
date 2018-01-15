'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = strategy;
var matchesEntityType = exports.matchesEntityType = function matchesEntityType(type) {
  return type === 'LINK';
};

function strategy(contentBlock, cb, contentState) {
  if (!contentState) return;
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey !== null && matchesEntityType(contentState.getEntity(entityKey).getType());
  }, cb);
}