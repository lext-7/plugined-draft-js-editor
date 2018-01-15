'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handleUpload = require('./handleUpload');

var _handleUpload2 = _interopRequireDefault(_handleUpload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createDndFileUploadPlugin = function createDndFileUploadPlugin() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    // Handle file drops
    handleDroppedFiles: (0, _handleUpload2.default)(config),
    createHandleUpload: _handleUpload2.default
  };
};

exports.default = createDndFileUploadPlugin;