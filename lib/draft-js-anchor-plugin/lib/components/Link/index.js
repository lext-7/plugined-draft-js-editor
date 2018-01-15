'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.node.isRequired,
  entityKey: _propTypes2.default.string,
  getEditorState: _propTypes2.default.func.isRequired
};

var Link = function Link(_ref) {
  var children = _ref.children,
      className = _ref.className,
      entityKey = _ref.entityKey,
      getEditorState = _ref.getEditorState,
      target = _ref.target;

  var entity = getEditorState().getCurrentContent().getEntity(entityKey);
  var entityData = entity ? entity.get('data') : undefined;
  var href = entityData && entityData.url || undefined;

  return _react2.default.createElement(
    'a',
    {
      className: className,
      title: href,
      href: href,
      target: target,
      rel: 'noopener noreferrer'
    },
    children
  );
};

Link.propTypes = propTypes;
exports.default = Link;