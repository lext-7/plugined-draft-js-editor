'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _unionClassNames = require('union-class-names');

var _unionClassNames2 = _interopRequireDefault(_unionClassNames);

var _EditorUtils = require('../../utils/EditorUtils');

var _EditorUtils2 = _interopRequireDefault(_EditorUtils);

var _AddLinkForm = require('./AddLinkForm');

var _AddLinkForm2 = _interopRequireDefault(_AddLinkForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LinkButton = function (_PureComponent) {
  _inherits(LinkButton, _PureComponent);

  function LinkButton() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LinkButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LinkButton.__proto__ || Object.getPrototypeOf(LinkButton)).call.apply(_ref, [this].concat(args))), _this), _this.onMouseDown = function (event) {
      event.preventDefault();
    }, _this.onAddLinkClick = function (e) {
      e.preventDefault();
      e.stopPropagation();
      var _this$props = _this.props,
          ownTheme = _this$props.ownTheme,
          placeholder = _this$props.placeholder,
          onOverrideContent = _this$props.onOverrideContent;

      var content = function content(props) {
        return _react2.default.createElement(_AddLinkForm2.default, _extends({}, props, { placeholder: placeholder, theme: ownTheme }));
      };
      onOverrideContent(content);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LinkButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          theme = _props.theme,
          onRemoveLinkAtSelection = _props.onRemoveLinkAtSelection;

      var hasLinkSelected = _EditorUtils2.default.hasEntity(this.props.store.getEditorState(), 'LINK');
      var className = hasLinkSelected ? (0, _unionClassNames2.default)(theme.button, theme.active) : theme.button;

      return _react2.default.createElement(
        'div',
        {
          className: theme.buttonWrapper,
          onMouseDown: this.onMouseDown
        },
        _react2.default.createElement(
          'button',
          {
            className: className,
            onClick: hasLinkSelected ? onRemoveLinkAtSelection : this.onAddLinkClick,
            'data-button-type': 'link',
            type: 'button'
          },
          _react2.default.createElement(
            'svg',
            { height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
            _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
            _react2.default.createElement('path', { d: 'M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z' })
          )
        )
      );
    }
  }]);

  return LinkButton;
}(_react.PureComponent);

LinkButton.propTypes = {
  placeholder: _propTypes2.default.string,
  store: _propTypes2.default.object.isRequired,
  ownTheme: _propTypes2.default.object.isRequired,
  onRemoveLinkAtSelection: _propTypes2.default.func.isRequired
};
exports.default = LinkButton;