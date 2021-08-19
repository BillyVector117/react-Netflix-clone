"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllLists = exports.updateList = exports.deleteList = exports.createList = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _List = _interopRequireDefault(require("../models/List"));

// CREATE list
var createList = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var newList, saveList;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!req.user.isAdmin) {
              _context.next = 14;
              break;
            }

            newList = new _List["default"](req.body);
            _context.prev = 2;
            _context.next = 5;
            return newList.save();

          case 5:
            saveList = _context.sent;
            res.status(201).json(saveList);
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](2);
            res.status(500).json(_context.t0);

          case 12:
            _context.next = 15;
            break;

          case 14:
            res.status(403).json("Action not allowed");

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 9]]);
  }));

  return function createList(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // DELETE list


exports.createList = createList;

var deleteList = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!req.user.isAdmin) {
              _context2.next = 12;
              break;
            }

            _context2.prev = 1;
            _context2.next = 4;
            return _List["default"].findByIdAndDelete(req.params.id);

          case 4:
            res.status(201).json('List successfully removed!');
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](1);
            res.status(500).json(_context2.t0);

          case 10:
            _context2.next = 13;
            break;

          case 12:
            res.status(403).json("Action not allowed");

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 7]]);
  }));

  return function deleteList(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // UPDATE list


exports.deleteList = deleteList;

var updateList = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var updatedList;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!req.user.isAdmin) {
              _context3.next = 13;
              break;
            }

            _context3.prev = 1;
            _context3.next = 4;
            return _List["default"].findByIdAndUpdate(req.params.id, {
              $set: req.body
            }, {
              "new": true
            });

          case 4:
            updatedList = _context3.sent;
            res.status(201).json(updatedList);
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            res.status(500).json(_context3.t0);

          case 11:
            _context3.next = 14;
            break;

          case 13:
            res.status(403).json("Action not allowed");

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));

  return function updateList(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); // GET ALL list


exports.updateList = updateList;

var getAllLists = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var typeQuery, genreQuery, list;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // Ex: http://localhost:5000/lists/?type=serie&genre=Horror
            typeQuery = req.query.type;
            genreQuery = req.query.genre;
            list = [];
            _context4.prev = 3;

            if (!typeQuery) {
              _context4.next = 16;
              break;
            }

            if (!genreQuery) {
              _context4.next = 11;
              break;
            }

            _context4.next = 8;
            return _List["default"].aggregate([{
              $sample: {
                size: 10
              }
            }, {
              $match: {
                type: typeQuery,
                genre: genreQuery
              }
            } // 'type' & 'genre' are List properties
            ]);

          case 8:
            list = _context4.sent;
            _context4.next = 14;
            break;

          case 11:
            _context4.next = 13;
            return _List["default"].aggregate([{
              $sample: {
                size: 10
              }
            }, {
              $match: {
                type: typeQuery
              }
            }]);

          case 13:
            list = _context4.sent;

          case 14:
            _context4.next = 19;
            break;

          case 16:
            _context4.next = 18;
            return _List["default"].aggregate([{
              $sample: {
                size: 10
              }
            }]);

          case 18:
            list = _context4.sent;

          case 19:
            res.status(200).json(list);
            _context4.next = 25;
            break;

          case 22:
            _context4.prev = 22;
            _context4.t0 = _context4["catch"](3);
            res.status(500).json(_context4.t0);

          case 25:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 22]]);
  }));

  return function getAllLists(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getAllLists = getAllLists;