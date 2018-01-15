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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/no-array-index-key */


var BlockTypeSelect = function (_React$PureComponent) {
  _inherits(BlockTypeSelect, _React$PureComponent);

  function BlockTypeSelect() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BlockTypeSelect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BlockTypeSelect.__proto__ || Object.getPrototypeOf(BlockTypeSelect)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      style: {
        transform: 'translate(-50%) scale(0)'
      }
    }, _this.onMouseEnter = function () {
      _this.setState({
        style: {
          transform: 'translate(-50%) scale(1)',
          transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)'
        }
      });
    }, _this.onMouseLeave = function () {
      if (_this.props.stick) {
        return;
      }
      _this.setState({
        style: {
          transform: 'translate(-50%) scale(0)'
        }
      });
    }, _this.onMouseDown = function (clickEvent) {
      clickEvent.preventDefault();
      clickEvent.stopPropagation();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BlockTypeSelect, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          theme = _props.theme,
          getEditorState = _props.getEditorState,
          setEditorState = _props.setEditorState,
          store = _props.store,
          stick = _props.stick,
          onStick = _props.onStick;

      return _react2.default.createElement(
        'div',
        {
          onMouseEnter: this.onMouseEnter,
          onMouseLeave: this.onMouseLeave,
          onMouseDown: this.onClick
        },
        _react2.default.createElement(
          'div',
          { className: theme.blockTypeSelectStyles.blockType },
          _react2.default.createElement(
            'svg',
            { height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
            _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
            _react2.default.createElement('path', { d: 'M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' })
          )
        ),
        _react2.default.createElement('div', { className: theme.blockTypeSelectStyles.spacer }),
        _react2.default.createElement(
          'div',
          { className: theme.blockTypeSelectStyles.popup, style: this.state.style },
          this.props.structure.map(function (Component, index) {
            return _react2.default.createElement(Component, {
              key: index,
              getEditorState: getEditorState,
              setEditorState: setEditorState,
              theme: theme.buttonStyles,
              store: store,
              stick: stick,
              onStick: onStick
            });
          })
        )
      );
    }
  }]);

  return BlockTypeSelect;
}(_react2.default.PureComponent);

exports.default = BlockTypeSelect;