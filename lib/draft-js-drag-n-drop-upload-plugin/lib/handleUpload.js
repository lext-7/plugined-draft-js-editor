'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _modifyBlockData = require('./modifiers/modifyBlockData');

var _modifyBlockData2 = _interopRequireDefault(_modifyBlockData);

var _removeBlock = require('./modifiers/removeBlock');

var _removeBlock2 = _interopRequireDefault(_removeBlock);

var _file = require('./utils/file');

var _block = require('./utils/block');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultHandleSelection = function defaultHandleSelection(selection, _ref) {
  var getEditorState = _ref.getEditorState,
      setEditorState = _ref.setEditorState;

  setEditorState(_draftJs.EditorState.acceptSelection(getEditorState(), selection));
};

var defaultHandleFiles = function defaultHandleFiles(files, filterFilter) {
  return Promise.all(files.map(function (_ref2) {
    var id = _ref2.id,
        file = _ref2.file;
    return (0, _file.readFile)(file, filterFilter).then(function (fileResult) {
      return { id: id, file: fileResult };
    });
  }));
};

var defaultAddPlaceholder = function defaultAddPlaceholder(placeholder, editorState, config) {
  return config.addImage(editorState, placeholder.file.src, {
    imageUploadProgress: 0,
    imageUploadingId: placeholder.id
  });
};

var defaultGetPlaceholderBlock = function defaultGetPlaceholderBlock(_ref3, editorState) {
  var id = _ref3.id;

  var blocks = (0, _block.getBlocksWhereEntityData)(editorState, function (block) {
    return block.imageUploadingId === id;
  });
  if (blocks.size) {
    return blocks.first();
  }
  return null;
};

var defaultHandleBlock = function defaultHandleBlock(_ref4, block, editorState) {
  var src = _ref4.src;
  return (0, _modifyBlockData2.default)(editorState, block.get('key'), { imageUploadProgress: undefined, imageUploadingId: null, src: src });
};

var defaultHandleProgress = function defaultHandleProgress(block, percent, editorState) {
  return (0, _modifyBlockData2.default)(editorState, block.get('key'), { imageUploadProgress: percent });
};

exports.default = function (config) {
  var uploadingId = 1;

  return function (selection, files, getPluginMethods) {
    var getEditorState = getPluginMethods.getEditorState,
        setEditorState = getPluginMethods.setEditorState;
    var _config$handleSelecto = config.handleSelectoin,
        handleSelectoin = _config$handleSelecto === undefined ? defaultHandleSelection : _config$handleSelecto,
        _config$handleFiles = config.handleFiles,
        handleFiles = _config$handleFiles === undefined ? defaultHandleFiles : _config$handleFiles,
        _config$addPlaceholde = config.addPlaceholder,
        addPlaceholder = _config$addPlaceholde === undefined ? defaultAddPlaceholder : _config$addPlaceholde,
        _config$getPlaceholde = config.getPlaceholderBlock,
        getPlaceholderBlock = _config$getPlaceholde === undefined ? defaultGetPlaceholderBlock : _config$getPlaceholde,
        handleUpload = config.handleUpload,
        _config$handleBlock = config.handleBlock,
        handleBlock = _config$handleBlock === undefined ? defaultHandleBlock : _config$handleBlock,
        _config$removeBlockOn = config.removeBlockOnError,
        removeBlockOnError = _config$removeBlockOn === undefined ? true : _config$removeBlockOn,
        _config$handleProgres = config.handleProgress,
        handleProgress = _config$handleProgres === undefined ? defaultHandleProgress : _config$handleProgres,
        handleError = config.handleError,
        fileFilter = config.fileFilter;


    if (handleUpload) {
      // Set data {files: [{ id, file }], formData: FormData}
      var data = { files: [] };
      for (var key in files) {
        // eslint-disable-line no-restricted-syntax
        if (files[key] && files[key] instanceof File) {
          var file = files[key];
          data.files.push({
            id: uploadingId,
            file: file
          });
          uploadingId += 1;
        }
      }

      if (selection && handleSelectoin) {
        handleSelectoin(selection, getPluginMethods);
      }

      var handleUploaded = function handleUploaded(uploadResult, success) {
        var newEditorState = getEditorState();
        uploadResult.forEach(function (result) {
          var block = getPlaceholderBlock(result, newEditorState);
          if (!block) {
            return;
          }

          if (success) {
            newEditorState = handleBlock(result, block, newEditorState);
          } else {
            if (removeBlockOnError) {
              var newContentState = (0, _removeBlock2.default)(newEditorState.getCurrentContent(), block.get('key'));
              newEditorState = _draftJs.EditorState.push(newEditorState, newContentState, 'move-block');
            }
            if (handleError) {
              newEditorState = handleError(result, block, newEditorState);
            }
          }
        });

        setEditorState(newEditorState);
      };

      // Read files on client side
      handleFiles(data.files, fileFilter).then(function (placeholders) {
        // Add blocks for each image before uploading
        var editorState = getEditorState();
        placeholders.forEach(function (placeholder) {
          editorState = addPlaceholder(placeholder, editorState, config);
        });
        setEditorState(editorState);

        // Perform upload
        handleUpload(data, function (uploadedFiles) {
          handleUploaded(uploadedFiles, true);
        }, function (errorFiles) {
          handleUploaded(errorFiles, false);
        }, function (id, percent) {
          // On progress, set entity data's progress field
          if (!id) {
            return;
          }
          var newEditorState = getEditorState();
          var block = getPlaceholderBlock({ id: id }, newEditorState);
          if (!block) {
            return;
          }
          // Propagate progress
          if (handleProgress) {
            newEditorState = handleProgress(block, percent, newEditorState);
          }

          setEditorState(newEditorState);
        });
      });

      return 'handled';
    }

    return undefined;
  };
};