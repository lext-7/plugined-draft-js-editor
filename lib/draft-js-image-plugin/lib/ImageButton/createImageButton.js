'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/no-children-prop */


exports.default = function (_ref) {
  var children = _ref.children;
  return function (_PureComponent) {
    _inherits(imageButton, _PureComponent);

    function imageButton(props) {
      _classCallCheck(this, imageButton);

      var _this = _possibleConstructorReturn(this, (imageButton.__proto__ || Object.getPrototypeOf(imageButton)).call(this, props));

      _this.onClick = function (e) {
        e.preventDefault();
        _this.input.click();
      };

      _this.inputChange = function (e) {
        var file = e.target.files[0];
        var _this$props = _this.props,
            handleUpload = _this$props.handleUpload,
            getEditorState = _this$props.getEditorState,
            setEditorState = _this$props.setEditorState;

        if (handleUpload) {
          handleUpload(null, [file], { getEditorState: getEditorState, setEditorState: setEditorState });
        }
      };

      _this.preventBubblingUp = function (event) {
        event.preventDefault();
      };

      _this.setInputRef = function (ref) {
        _this.input = ref;
      };

      _this.inputStyle = {
        display: 'none'
      };
      return _this;
    }

    _createClass(imageButton, [{
      key: 'render',
      value: function render() {
        var theme = this.props.theme;

        return _react2.default.createElement(
          'div',
          {
            className: theme.buttonWrapper,
            onMouseDown: this.preventBubblingUp
          },
          _react2.default.createElement('button', {
            className: theme.button,
            onClick: this.onClick,
            type: 'button',
            'data-button-type': 'image-add',
            children: children
          }),
          _react2.default.createElement(
            'div',
            { className: theme.addImage },
            _react2.default.createElement('input', {
              type: 'file',
              ref: this.setInputRef,
              onChange: this.inputChange,
              style: this.inputStyle
            })
          )
        );
      }
    }]);

    return imageButton;
  }(_react.PureComponent);
};