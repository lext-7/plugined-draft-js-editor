'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _decorateComponentWithProps = require('decorate-component-with-props');

var _decorateComponentWithProps2 = _interopRequireDefault(_decorateComponentWithProps);

var _createStore = require('./utils/createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _Toolbar = require('./components/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _DefaultBlockTypeSelect = require('./components/DefaultBlockTypeSelect');

var _DefaultBlockTypeSelect2 = _interopRequireDefault(_DefaultBlockTypeSelect);

var _buttonStyles = {
  "buttonWrapper": "draftJsToolbar__buttonWrapper__1Dmqh",
  "button": "draftJsToolbar__button__qi1gf",
  "active": "draftJsToolbar__active__3qcpF",
  "separator": "draftJsToolbar__separator__3M3L7"
};

var _buttonStyles2 = _interopRequireDefault(_buttonStyles);

var _blockTypeSelectStyles = {
  "blockType": "draftJsToolbar__blockType__27Jwn",
  "spacer": "draftJsToolbar__spacer__2Os2z",
  "popup": "draftJsToolbar__popup__GHzbY"
};

var _blockTypeSelectStyles2 = _interopRequireDefault(_blockTypeSelectStyles);

var _toolbarStyles = {
  "wrapper": "draftJsToolbar__wrapper__9NZgg"
};

var _toolbarStyles2 = _interopRequireDefault(_toolbarStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var defaultTheme = { buttonStyles: _buttonStyles2.default, blockTypeSelectStyles: _blockTypeSelectStyles2.default, toolbarStyles: _toolbarStyles2.default };

  var store = (0, _createStore2.default)({
    isVisible: false
  });

  var _config$theme = config.theme,
      theme = _config$theme === undefined ? defaultTheme : _config$theme,
      _config$structure = config.structure,
      structure = _config$structure === undefined ? [_DefaultBlockTypeSelect2.default] : _config$structure;


  var toolbarProps = {
    store: store,
    structure: structure,
    theme: theme
  };

  return {
    initialize: function initialize(_ref) {
      var setEditorState = _ref.setEditorState,
          getEditorState = _ref.getEditorState,
          getEditorRef = _ref.getEditorRef;

      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
      store.updateItem('getEditorRef', getEditorRef);
    },
    // Re-Render the toolbar on every change
    onChange: function onChange(editorState) {
      store.updateItem('editorState', editorState);
      return editorState;
    },
    SideToolbar: (0, _decorateComponentWithProps2.default)(_Toolbar2.default, toolbarProps)
  };
};