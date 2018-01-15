'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Image = undefined;

var _decorateComponentWithProps = require('decorate-component-with-props');

var _decorateComponentWithProps2 = _interopRequireDefault(_decorateComponentWithProps);

var _addImage = require('./modifiers/addImage');

var _addImage2 = _interopRequireDefault(_addImage);

var _Image = require('./Image');

var _Image2 = _interopRequireDefault(_Image);

var _imageStyles = {
  "image": "draftJsEmojiPlugin__image__192TI",
  "imageUploading": "draftJsEmojiPlugin__imageUploading__1HKu-",
  "spin": "draftJsEmojiPlugin__spin__1Z_QV"
};

var _imageStyles2 = _interopRequireDefault(_imageStyles);

var _ImageButton = require('./ImageButton');

var _ImageButton2 = _interopRequireDefault(_ImageButton);

var _createImageButton2 = require('./ImageButton/createImageButton');

var _createImageButton3 = _interopRequireDefault(_createImageButton2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultTheme = {
  image: _imageStyles2.default.image
};

exports.default = function () {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var theme = config.theme ? config.theme : defaultTheme;
  var Image = config.imageComponent || _Image2.default;
  if (config.decorator) {
    Image = config.decorator(Image);
  }
  var ThemedImage = (0, _decorateComponentWithProps2.default)(Image, { theme: theme });

  var loadingStyle = config.loadingStyle || _imageStyles2.default.imageUploading;

  return {
    blockRendererFn: function blockRendererFn(block, _ref) {
      var getEditorState = _ref.getEditorState;

      if (block.getType() === 'atomic') {
        var contentState = getEditorState().getCurrentContent();
        var entity = block.getEntityAt(0);
        if (!entity) return null;
        var type = contentState.getEntity(entity).getType();
        if (type === 'image') {
          return {
            component: ThemedImage,
            editable: false
          };
        }
        return null;
      }

      return null;
    },
    blockStyleFn: function blockStyleFn(block, _ref2) {
      var getEditorState = _ref2.getEditorState;

      var editorState = getEditorState();
      var contentState = editorState.getCurrentContent();
      var entity = block.getEntityAt(0);
      if (!entity) {
        return null;
      }
      var data = contentState.getEntity(entity).getData();
      if (!data) {
        return null;
      }
      var imageUploadProgress = data.imageUploadProgress;

      if (typeof imageUploadProgress !== 'undefined' && imageUploadProgress !== null) {
        return loadingStyle;
      }
      return null;
    },
    addImage: _addImage2.default,
    ImageButton: (0, _decorateComponentWithProps2.default)(_ImageButton2.default, {
      handleUpload: config.handleUpload
    }),
    createImageButton: function createImageButton(createImageButtonConfig) {
      return (0, _decorateComponentWithProps2.default)((0, _createImageButton3.default)(createImageButtonConfig), {
        handleUpload: config.handleUpload
      });
    }
  };
};

var Image = exports.Image = _Image2.default;