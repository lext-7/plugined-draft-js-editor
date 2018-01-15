'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _unionClassNames = require('union-class-names');

var _unionClassNames2 = _interopRequireDefault(_unionClassNames);

var _URLUtils = require('../utils/URLUtils');

var _URLUtils2 = _interopRequireDefault(_URLUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddLinkForm = function (_PureComponent) {
  _inherits(AddLinkForm, _PureComponent);

  function AddLinkForm() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AddLinkForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AddLinkForm.__proto__ || Object.getPrototypeOf(AddLinkForm)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: '',
      isInvalid: false
    }, _this.onRef = function (node) {
      _this.input = node;
    }, _this.onChange = function (_ref2) {
      var value = _ref2.target.value;

      var nextState = { value: value };
      if (_this.state.isInvalid && _URLUtils2.default.isUrl(_URLUtils2.default.normalizeUrl(value))) {
        nextState.isInvalid = false;
      }
      _this.setState(nextState);
    }, _this.onClose = function () {
      var _this$props = _this.props,
          onStick = _this$props.onStick,
          onClose = _this$props.onClose;

      if (onStick) {
        onStick(false);
      }
      if (onClose) {
        onClose();
      }
    }, _this.onKeyDown = function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        _this.submit();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        _this.onClose();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AddLinkForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var onStick = this.props.onStick;

      if (onStick) {
        onStick(true);
      }
      this.input.focus();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var onStick = this.props.onStick;

      if (onStick) {
        onStick(false);
      }
    }
  }, {
    key: 'submit',
    value: function submit() {
      var onSubmit = this.props.onSubmit;
      var url = this.state.value;

      url = _URLUtils2.default.normalizeUrl(url);
      if (!_URLUtils2.default.isUrl(url)) {
        this.setState({ isInvalid: true });
        return;
      }
      if (onSubmit) {
        onSubmit(url);
      }
      this.input.blur();
      this.onClose();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          theme = _props.theme,
          placeholder = _props.placeholder;
      var _state = this.state,
          value = _state.value,
          isInvalid = _state.isInvalid;


      var className = isInvalid ? (0, _unionClassNames2.default)(theme.addVideoInput, theme.addVideoInputInvalid) : theme.addVideoInput;

      return _react2.default.createElement('input', {
        className: className,
        onBlur: this.onClose,
        onChange: this.onChange,
        onKeyDown: this.onKeyDown,
        placeholder: placeholder,
        ref: this.onRef,
        type: 'text',
        value: value
      });
    }
  }]);

  return AddLinkForm;
}(_react.PureComponent);

AddLinkForm.propTypes = {
  theme: _propTypes2.default.object.isRequired,
  placeholder: _propTypes2.default.string
};
AddLinkForm.defaultProps = {
  placeholder: 'Enter a URL and press enter'
};
exports.default = AddLinkForm;