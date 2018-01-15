'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _decorateComponentWithProps = require('decorate-component-with-props');

var _decorateComponentWithProps2 = _interopRequireDefault(_decorateComponentWithProps);

var _createStore = require('./utils/createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _UndoButton = require('./UndoButton');

var _UndoButton2 = _interopRequireDefault(_UndoButton);

var _RedoButton = require('./RedoButton');

var _RedoButton2 = _interopRequireDefault(_RedoButton);

var _styles = {
  "button": "draftJsUndoPlugin__button__3Vugn"
};

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultTheme = {
  redo: _styles2.default.button,
  undo: _styles2.default.button
};

exports.default = function () {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var undoContent = config.undoContent ? config.undoContent : '↺';
  var redoContent = config.redoContent ? config.redoContent : '↻';
  var store = (0, _createStore2.default)();

  // Styles are overwritten instead of merged as merging causes a lot of confusion.
  //
  // Why? Because when merging a developer needs to know all of the underlying
  // styles which needs a deep dive into the code. Merging also makes it prone to
  // errors when upgrading as basically every styling change would become a major
  // breaking change. 1px of an increased padding can break a whole layout.
  var theme = config.theme ? config.theme : defaultTheme;
  return {
    UndoButton: (0, _decorateComponentWithProps2.default)(_UndoButton2.default, { theme: theme, store: store, children: undoContent }),
    RedoButton: (0, _decorateComponentWithProps2.default)(_RedoButton2.default, { theme: theme, store: store, children: redoContent }),
    initialize: function initialize(_ref) {
      var getEditorState = _ref.getEditorState,
          setEditorState = _ref.setEditorState;

      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
    },
    onChange: function onChange(editorState) {
      store.updateItem('selection', editorState.getSelection());
      return editorState;
    }
  };
};