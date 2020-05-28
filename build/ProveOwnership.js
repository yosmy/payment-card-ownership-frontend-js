"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _money = _interopRequireDefault(require("@yosmy/money"));

var _style = require("@yosmy/style");

var _ui = require("@yosmy/ui");

var _payment = require("@yosmy/payment");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ProveOwnership = _react["default"].memo(function (_ref) {
  var theme = _ref.theme,
      ui = _ref.ui,
      api = _ref.api,
      card = _ref.card,
      onProve = _ref.onProve;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      amount = _useState2[0],
      setAmount = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      help = _useState4[0],
      setHelp = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      proved = _useState6[0],
      setProved = _useState6[1];

  var _useState7 = (0, _react.useState)({
    failure: null,
    error: null,
    progress: false
  }),
      _useState8 = _slicedToArray(_useState7, 2),
      execution = _useState8[0],
      setExecution = _useState8[1];

  (0, _react.useEffect)(function () {
    setExecution({
      failure: null,
      error: null,
      progress: true
    });
    api.card.initOwnership(card.id, // onReturn
    function () {
      setExecution({
        failure: false,
        error: null,
        progress: false
      });
    }, // onException
    function (_ref2) {
      var message = _ref2.message;
      setExecution({
        failure: message,
        error: null,
        progress: false
      });
    });
  }, []);

  if (execution.failure === null) {
    return /*#__PURE__*/_react["default"].createElement(ui.layout, {
      progress: execution.progress
    });
  }

  if (execution.failure !== false) {
    return /*#__PURE__*/_react["default"].createElement(ui.layout, {
      progress: execution.progress
    }, /*#__PURE__*/_react["default"].createElement(_ui.Error, null, "Ocurri\xF3 un error con tu tarjeta:\n", execution.failure));
  }

  if (proved === true) {
    return /*#__PURE__*/_react["default"].createElement(ui.layout, {
      padding: {
        top: 2,
        bottom: 0,
        left: 0,
        right: 0
      }
    }, /*#__PURE__*/_react["default"].createElement(ui.icons.states.ok, {
      size: 40
    }), /*#__PURE__*/_react["default"].createElement(_ui.Text, {
      align: {
        self: "center"
      },
      margin: {
        top: 2
      }
    }, "Tu tarjeta terminada en ", card.last4, " ha sido verificada correctamente."), /*#__PURE__*/_react["default"].createElement(_ui.TertiaryButton, {
      align: {
        self: 'stretch'
      },
      margin: {
        top: 2
      },
      padding: 2,
      border: {
        color: theme.divider.border.color,
        top: {
          width: theme.divider.border.width
        }
      },
      onClick: function onClick() {
        onProve();
      }
    }, /*#__PURE__*/_react["default"].createElement(_ui.Text, null, "Cerrar")));
  }

  return /*#__PURE__*/_react["default"].createElement(ui.layout, {
    progress: execution.progress
  }, /*#__PURE__*/_react["default"].createElement(_ui.Container, null, /*#__PURE__*/_react["default"].createElement(_ui.Text, {
    align: {
      self: "flex-start"
    },
    wrap: true
  }, "Revisa la cuenta de banco de tu tarjeta terminada en ", card.last4, "."), /*#__PURE__*/_react["default"].createElement(_ui.Text, {
    align: {
      self: "flex-start"
    },
    wrap: true,
    margin: {
      top: 2
    }
  }, "Escribe la cantidad exacta de un nuevo cobro que te hemos hecho.")), /*#__PURE__*/_react["default"].createElement(_ui.Input, {
    value: amount,
    keyboard: "decimal",
    placeholder: "Escribe el cobro",
    width: 150,
    margin: {
      top: 2
    },
    onChange: function onChange(value) {
      setAmount(value);
    }
  }), execution.error && /*#__PURE__*/_react["default"].createElement(_ui.Error, {
    margin: {
      top: 2
    }
  }, execution.error), /*#__PURE__*/_react["default"].createElement(_ui.PrimaryButton, {
    progress: execution.progress,
    disabled: execution.progress,
    margin: {
      top: 2
    },
    onClick: function onClick() {
      if (!amount) {
        setExecution(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            error: "Escribe la nueva cantidad que te cobramos a tu tarjeta"
          });
        });
        return;
      }

      setExecution({
        failure: false,
        error: null,
        progress: true
      });
      api.card.proveOwnership(card.id, _money["default"].normalize(amount), // onReturn
      function () {
        setProved(true);
      }, // onException
      function (_ref3) {
        var message = _ref3.message;
        setExecution({
          failure: false,
          error: message,
          progress: false
        });
      });
    }
  }, /*#__PURE__*/_react["default"].createElement(_ui.Text, null, "Verificar")), !help && /*#__PURE__*/_react["default"].createElement(_ui.SecondaryButton, {
    margin: {
      top: 2
    },
    onClick: function onClick() {
      setHelp(function (prev) {
        return !prev;
      });
    }
  }, /*#__PURE__*/_react["default"].createElement(_ui.Text, null, "\xBFPor qu\xE9 es este cobro?")), help && /*#__PURE__*/_react["default"].createElement(_ui.EmptyLayout, null, /*#__PURE__*/_react["default"].createElement(_ui.SecondaryText, {
    align: {
      self: "flex-start"
    },
    margin: {
      top: 2
    }
  }, "Haciendo este cobro y pidi\xE9ndote que busques en tu cuenta de banco la cantidad exacta, nos aseguramos que la tarjeta es realmente tuya y no es alguien que te rob\xF3 los datos."), /*#__PURE__*/_react["default"].createElement(_ui.SecondaryText, {
    align: {
      self: "flex-start"
    },
    margin: {
      top: 2
    }
  }, "Al terminar la comprobaci\xF3n, te devolveremos este cobro a la misma tarjeta y podr\xE1s seguir us\xE1ndola."), /*#__PURE__*/_react["default"].createElement(_ui.SecondaryText, {
    align: {
      self: "flex-start"
    },
    margin: {
      top: 2
    }
  }, "Este proceso se realiza una sola vez para cada tarjeta que agregues."), /*#__PURE__*/_react["default"].createElement(_ui.SecondaryButton, {
    margin: {
      top: 2
    },
    onClick: function onClick() {
      setHelp(function (prev) {
        return !prev;
      });
    }
  }, /*#__PURE__*/_react["default"].createElement(_ui.Text, null, "Ok"))));
}, function () {
  return true;
});

ProveOwnership.propTypes = {
  ui: _propTypes["default"].shape({
    layout: _propTypes["default"].func.isRequired,
    icons: _propTypes["default"].shape({
      states: _propTypes["default"].shape({
        ok: _propTypes["default"].func.isRequired
      }).isRequired
    }).isRequired
  }).isRequired,
  api: _propTypes["default"].shape({
    card: _propTypes["default"].shape({
      initOwnership: _propTypes["default"].func.isRequired,
      proveOwnership: _propTypes["default"].func.isRequired
    })
  }).isRequired,
  card: _payment.CardProp,
  onProve: _propTypes["default"].func.isRequired // ()

};

var _default = (0, _style.withTheme)(ProveOwnership);

exports["default"] = _default;