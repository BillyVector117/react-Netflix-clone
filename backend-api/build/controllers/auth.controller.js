"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.register = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../models/User"));

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _excluded = ["password"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var register = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, username, email, password, gender, isAdmin, newUser, user;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password, gender = _req$body.gender;
            isAdmin = req.body.isAdmin;
            newUser = new _User["default"]({
              username: username,
              email: email,
              password: _cryptoJs["default"].AES.encrypt(password, process.env.SECRET_KEY).toString(),
              gender: gender,
              isAdmin: isAdmin
            });
            _context.prev = 3;
            _context.next = 6;
            return newUser.save();

          case 6:
            user = _context.sent;
            res.status(201).json(user);
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](3);
            res.status(500).json(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 10]]);
  }));

  return function register(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.register = register;

var login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var email, passwordBody, user, bytes, originalText, myToken, _user$_doc, password, userProperties;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            email = req.body.email;
            passwordBody = req.body.password;
            _context2.prev = 2;
            _context2.next = 5;
            return _User["default"].findOne({
              email: email
            });

          case 5:
            user = _context2.sent;
            !user && res.status(401).json('Wrong credentials or User does not exist!');
            bytes = _cryptoJs["default"].AES.decrypt(user.password, process.env.SECRET_KEY);
            originalText = bytes.toString(_cryptoJs["default"].enc.Utf8); // console.log(originalText)

            originalText !== passwordBody && res.status(401).json("Wrong credentials :("); // Creating a Token

            myToken = _jsonwebtoken["default"].sign({
              id: user._id,
              isAdmin: user.isAdmin
            }, process.env.SECRET_KEY, {
              expiresIn: "5d"
            }); // Excluding password for response

            _user$_doc = user._doc, password = _user$_doc.password, userProperties = (0, _objectWithoutProperties2["default"])(_user$_doc, _excluded);
            res.status(200).header("authtoken", "bearer ".concat(myToken)).json(_objectSpread(_objectSpread({}, userProperties), {}, {
              myToken: myToken
            }));
            _context2.next = 19;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);
            res.status(500).json(_context2.t0);

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 15]]);
  }));

  return function login(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.login = login;