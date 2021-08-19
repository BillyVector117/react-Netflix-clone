"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStats = exports.deleteUser = exports.updateBeingAdmin = exports.update = exports.getAll = exports.getOne = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../models/User"));

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

var _excluded = ["password"];

// GET ONE
var getOne = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var user, _user$_doc, _password, moreUserProperties;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _User["default"].findById(req.params.id);

          case 3:
            user = _context.sent;
            _user$_doc = user._doc, _password = _user$_doc.password, moreUserProperties = (0, _objectWithoutProperties2["default"])(_user$_doc, _excluded);
            res.status(200).json(moreUserProperties);
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            res.status(500).json(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function getOne(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // GET All


exports.getOne = getOne;

var getAll = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var query, users;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // req.user is created by jwt (id, isAdmin, iat, exp)
            query = req.query.limit;

            if (!req.user.isAdmin) {
              _context2.next = 21;
              break;
            }

            _context2.prev = 2;

            if (!query) {
              _context2.next = 9;
              break;
            }

            _context2.next = 6;
            return _User["default"].find().sort({
              _id: -1
            }).limit(5);

          case 6:
            _context2.t0 = _context2.sent;
            _context2.next = 12;
            break;

          case 9:
            _context2.next = 11;
            return _User["default"].find();

          case 11:
            _context2.t0 = _context2.sent;

          case 12:
            users = _context2.t0;
            res.status(200).json(users);
            _context2.next = 19;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t1 = _context2["catch"](2);
            res.status(500).json(_context2.t1);

          case 19:
            _context2.next = 22;
            break;

          case 21:
            res.status(403).json('Only Admin can see all users!');

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 16]]);
  }));

  return function getAll(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // UPDATE


exports.getAll = getAll;

var update = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var updateUser;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // req.user is created by jwt (id, isAdmin, iat, exp)
            console.log("req.user: ", req.user);

            if (!(req.user.id === req.params.id || req.user.isAdmin)) {
              _context3.next = 15;
              break;
            }

            if (req.body.password) {
              req.body.password = _cryptoJs["default"].AES.encrypt(password, process.env.SECRET_KEY).toString();
            }

            _context3.prev = 3;
            _context3.next = 6;
            return _User["default"].findByIdAndUpdate(req.params.id, {
              $set: req.body
            }, {
              "new": true
            });

          case 6:
            updateUser = _context3.sent;
            res.status(200).json(updateUser);
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](3);
            res.status(500).json(_context3.t0);

          case 13:
            _context3.next = 16;
            break;

          case 15:
            res.status(403).json('Only owner can update this');

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 10]]);
  }));

  return function update(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); // UPDATE BEING ADMIN


exports.update = update;

var updateBeingAdmin = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var updateUser;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!req.user.isAdmin) {
              _context4.next = 13;
              break;
            }

            _context4.prev = 1;
            _context4.next = 4;
            return _User["default"].findByIdAndUpdate(req.params.id, {
              $set: req.body
            }, {
              "new": true
            });

          case 4:
            updateUser = _context4.sent;
            res.status(200).json(updateUser);
            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            res.status(500).json(_context4.t0);

          case 11:
            _context4.next = 14;
            break;

          case 13:
            res.status(403).json('Only owner can update this');

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 8]]);
  }));

  return function updateBeingAdmin(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); // DELETE


exports.updateBeingAdmin = updateBeingAdmin;

var deleteUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            // req.user is created by jwt (id, isAdmin, iat, exp)
            console.log("req.user: ", req.user);

            if (!(req.user.id === req.params.id || req.user.isAdmin)) {
              _context5.next = 13;
              break;
            }

            _context5.prev = 2;
            _context5.next = 5;
            return _User["default"].findByIdAndDelete(req.params.id);

          case 5:
            res.status(200).json("User has been deleted!");
            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](2);
            res.status(500).json(_context5.t0);

          case 11:
            _context5.next = 14;
            break;

          case 13:
            res.status(403).json('Only owner can delete this');

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 8]]);
  }));

  return function deleteUser(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); // GET USER STATS


exports.deleteUser = deleteUser;

var getStats = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var today, lastYear, monthArray, data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            today = new Date();
            lastYear = today.setFullYear(today.setFullYear() - 1);
            monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            _context6.prev = 3;
            _context6.next = 6;
            return _User["default"].aggregate([{
              $project: {
                month: {
                  $month: "$createdAt"
                }
              }
            }, {
              $group: {
                _id: "$month",
                total: {
                  $sum: 1
                }
              }
            }]);

          case 6:
            data = _context6.sent;
            res.status(200).json(data);
            _context6.next = 14;
            break;

          case 10:
            _context6.prev = 10;
            _context6.t0 = _context6["catch"](3);
            console.log(_context6.t0);
            res.status(500).json(_context6.t0);

          case 14:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[3, 10]]);
  }));

  return function getStats(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getStats = getStats;