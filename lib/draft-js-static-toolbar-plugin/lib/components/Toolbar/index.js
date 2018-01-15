'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/no-array-index-key */


var Toolbar = function (_React$PureComponent) {
  _inherits(Toolbar, _React$PureComponent);

  function Toolbar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Toolbar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      /**
       * If this is set, the toolbar will render this instead of the regular
       * structure and will also be shown when the editor loses focus.
       * @type {Component}
       */
      overrideContent: undefined

      // componentWillMount() {
      //   this.props.store.subscribeToItem('selection', () => this.forceUpdate());
      // }

      // componentWillUnmount() {
      //   this.props.store.unsubscribeFromItem('selection', () => this.forceUpdate());
      // }

      /**
       * This can be called by a child in order to render custom content instead
       * of the regular structure. It's the responsibility of the callee to call
       * this function again with `undefined` in order to reset `overrideContent`.
       * @param {Component} overrideContent
       */
    }, _this.onOverrideContent = function (overrideContent) {
      return _this.setState({ overrideContent: overrideContent });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Toolbar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          theme = _props.theme,
          store = _props.store,
          structure = _props.structure;
      var OverrideContent = this.state.overrideContent;

      var childrenProps = {
        store: store,
        theme: theme.buttonStyles,
        getEditorState: store.getItem('getEditorState'),
        setEditorState: store.getItem('setEditorState'),
        onOverrideContent: this.onOverrideContent
      };

      return _react2.default.createElement(
        'div',
        {
          className: theme.toolbarStyles.toolbar
        },
        OverrideContent ? _react2.default.createElement(OverrideContent, childrenProps) : structure.map(function (Component, index) {
          return _react2.default.createElement(Component, _extends({ key: index }, childrenProps));
        })
      );
    }
  }]);

  return Toolbar;
}(_react2.default.PureComponent);

exports.default = Toolbar;