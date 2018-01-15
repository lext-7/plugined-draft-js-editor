'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _decorateComponentWithProps = require('decorate-component-with-props');

var _decorateComponentWithProps2 = _interopRequireDefault(_decorateComponentWithProps);

var _Link = require('./components/Link');

var _Link2 = _interopRequireDefault(_Link);

var _LinkButton = require('./components/LinkButton');

var _LinkButton2 = _interopRequireDefault(_LinkButton);

var _EditorUtils = require('./utils/EditorUtils');

var _EditorUtils2 = _interopRequireDefault(_EditorUtils);

var _linkStrategy = require('./linkStrategy');

var _linkStrategy2 = _interopRequireDefault(_linkStrategy);

var _linkStyles = {
  "input": "draftJsMentionPlugin__input__1Wxng",
  "inputInvalid": "draftJsMentionPlugin__inputInvalid__X9hHv",
  "link": "draftJsMentionPlugin__link__TQHAX"
};

var _linkStyles2 = _interopRequireDefault(_linkStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var defaultTheme = _linkStyles2.default;

  var _config$theme = config.theme,
      theme = _config$theme === undefined ? defaultTheme : _config$theme,
      placeholder = config.placeholder,
      Link = config.Link,
      linkTarget = config.linkTarget;


  var store = {
    getEditorState: undefined,
    setEditorState: undefined
  };

  var buttonProps = {
    ownTheme: theme,
    store: store,
    placeholder: placeholder,
    onRemoveLinkAtSelection: function onRemoveLinkAtSelection() {
      return store.setEditorState(_EditorUtils2.default.removeLinkAtSelection(store.getEditorState()));
    }
  };

  return {
    initialize: function initialize(_ref) {
      var getEditorState = _ref.getEditorState,
          setEditorState = _ref.setEditorState;

      store.getEditorState = getEditorState;
      store.setEditorState = setEditorState;
    },

    decorators: [{
      strategy: _linkStrategy2.default,
      matchesEntityType: _linkStrategy.matchesEntityType,
      component: Link || (0, _decorateComponentWithProps2.default)(_Link2.default, {
        className: theme.link,
        target: linkTarget
      })
    }],

    LinkButton: (0, _decorateComponentWithProps2.default)(_LinkButton2.default, buttonProps),
    createLinkButton: function createLinkButton(Button) {
      return (0, _decorateComponentWithProps2.default)(Button, buttonProps);
    }
  };
};