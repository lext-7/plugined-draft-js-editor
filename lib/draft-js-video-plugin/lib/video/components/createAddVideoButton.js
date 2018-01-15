'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AddVideoForm = require('./AddVideoForm');

var _AddVideoForm2 = _interopRequireDefault(_AddVideoForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/no-children-prop */


exports.default = function (_ref) {
  var children = _ref.children;
  return function (_PureComponent) {
    _inherits(AddVideoButton, _PureComponent);

    function AddVideoButton(props) {
      _classCallCheck(this, AddVideoButton);

      var _this = _possibleConstructorReturn(this, (AddVideoButton.__proto__ || Object.getPrototypeOf(AddVideoButton)).call(this, props));

      _this.onClick = function (e) {
        e.preventDefault();
        _this.setState({
          formVisible: true
        });
      };

      _this.onClose = function () {
        _this.setState({
          formVisible: false
        });
      };

      _this.onSubmit = function (url) {
        var _this$props = _this.props,
            addVideo = _this$props.addVideo,
            store = _this$props.store;

        var getEditorState = store.getItem('getEditorState');
        var setEditorState = store.getItem('setEditorState');

        setEditorState(addVideo(getEditorState(), { src: url }));
      };

      _this.preventBubblingUp = function (event) {
        if (event.target.tagName !== 'INPUT') {
          event.preventDefault();
        }
      };

      _this.state = {
        formVisible: false
      };
      return _this;
    }

    _createClass(AddVideoButton, [{
      key: 'renderForm',
      value: function renderForm() {
        var Form = this.props.AddVideoForm || _AddVideoForm2.default;
        var _props = this.props,
            theme = _props.theme,
            store = _props.store,
            stick = _props.stick,
            onStick = _props.onStick;


        return _react2.default.createElement(Form, {
          theme: theme,
          store: store,
          stick: stick,
          onStick: onStick,
          onSubmit: this.onSubmit,
          onClose: this.onClose
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var theme = this.props.theme;
        var formVisible = this.state.formVisible;


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
            'data-button-type': 'video-add',
            children: children
          }),
          formVisible ? this.renderForm() : null
        );
      }
    }]);

    return AddVideoButton;
  }(_react.PureComponent);
};