'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _timers = require('timers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StatefulButton = function (_React$PureComponent) {
  _inherits(StatefulButton, _React$PureComponent);

  function StatefulButton(props) {
    _classCallCheck(this, StatefulButton);

    var _this = _possibleConstructorReturn(this, (StatefulButton.__proto__ || Object.getPrototypeOf(StatefulButton)).call(this, props));

    _this.onSelectionChanged = function () {
      (0, _timers.setTimeout)(function () {
        _this.setState({
          active: _this.isActive()
        });
      }, 0);
    };

    _this.state = {
      active: _this.isActive()
    };
    return _this;
  }

  _createClass(StatefulButton, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var store = this.props.store;

      if (store) {
        store.subscribeToItem('selection', this.onSelectionChanged);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var store = this.props.store;

      if (store) {
        store.unsubscribeFromItem('selection', this.onSelectionChanged);
      }
    }
  }, {
    key: 'isActive',
    value: function isActive() {
      // eslint-disable-line no-unused-vars
      return false;
    }
  }]);

  return StatefulButton;
}(_react2.default.PureComponent);

exports.default = StatefulButton;