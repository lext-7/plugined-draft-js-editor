'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _decorateComponentWithProps = require('decorate-component-with-props');

var _decorateComponentWithProps2 = _interopRequireDefault(_decorateComponentWithProps);

var _addVideo = require('./video/modifiers/addVideo');

var _addVideo2 = _interopRequireDefault(_addVideo);

var _DefaultVideoComponent = require('./video/components/DefaultVideoComponent');

var _DefaultVideoComponent2 = _interopRequireDefault(_DefaultVideoComponent);

var _createAddVideoButton = require('./video/components/createAddVideoButton');

var _createAddVideoButton2 = _interopRequireDefault(_createAddVideoButton);

var _AddVideoButton = require('./video/components/AddVideoButton');

var _AddVideoButton2 = _interopRequireDefault(_AddVideoButton);

var _constants = require('./video/constants');

var types = _interopRequireWildcard(_constants);

var _createStore = require('./video/utils/createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _videoStyles = {
  "iframeContainer": "draftJsMentionPlugin__iframeContainer__21EVZ",
  "iframe": "draftJsMentionPlugin__iframe__stjRT",
  "invalidVideoSrc": "draftJsMentionPlugin__invalidVideoSrc__3dIji"
};

var _videoStyles2 = _interopRequireDefault(_videoStyles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultTheme = _videoStyles2.default;

var videoPlugin = function videoPlugin() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var theme = config.theme ? config.theme : defaultTheme;
  var Video = config.videoComponent || _DefaultVideoComponent2.default;
  if (config.decorator) {
    Video = config.decorator(Video);
  }

  var getSrc = config.getSrc;


  var store = (0, _createStore2.default)({
    getEditorState: undefined,
    setEditorState: undefined
  });

  var ThemedVideo = (0, _decorateComponentWithProps2.default)(Video, { theme: theme, getSrc: getSrc });

  var videoButtonProps = {
    addVideo: _addVideo2.default,
    store: store
  };

  return {
    initialize: function initialize(_ref) {
      var getEditorState = _ref.getEditorState,
          setEditorState = _ref.setEditorState;

      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
    },
    blockRendererFn: function blockRendererFn(block, _ref2) {
      var getEditorState = _ref2.getEditorState;

      if (block.getType() === types.ATOMIC) {
        // TODO subject to change for draft-js next release
        var contentState = getEditorState().getCurrentContent();
        var entity = contentState.getEntity(block.getEntityAt(0));
        var type = entity.getType();

        var _entity$getData = entity.getData(),
            src = _entity$getData.src;

        if (type === types.VIDEOTYPE) {
          return {
            component: ThemedVideo,
            editable: false,
            props: {
              src: src
            }
          };
        }
      }

      return null;
    },
    addVideo: _addVideo2.default,
    types: types,
    createVideoButton: _createAddVideoButton2.default,
    decorateVideoButton: function decorateVideoButton(Button) {
      return (0, _decorateComponentWithProps2.default)(Button, videoButtonProps);
    },

    AddVideoButton: (0, _decorateComponentWithProps2.default)(_AddVideoButton2.default, videoButtonProps)
  };
};

exports.default = videoPlugin;