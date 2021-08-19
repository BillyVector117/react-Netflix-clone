"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllMovies = exports.getRandomMovieOrSerie = exports.getMovie = exports.deleteMovie = exports.updateMovie = exports.newMovie = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Movie = _interopRequireDefault(require("../models/Movie"));

// CREATE ONE
var newMovie = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _newMovie, saveMovie;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!req.user.isAdmin) {
              _context.next = 14;
              break;
            }

            _newMovie = new _Movie["default"](req.body);
            _context.prev = 2;
            _context.next = 5;
            return _newMovie.save();

          case 5:
            saveMovie = _context.sent;
            res.status(201).json(saveMovie);
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

  return function newMovie(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // UPDATE movie


exports.newMovie = newMovie;

var updateMovie = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _updateMovie;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!req.user.isAdmin) {
              _context2.next = 13;
              break;
            }

            _context2.prev = 1;
            _context2.next = 4;
            return _Movie["default"].findByIdAndUpdate(req.params.id, {
              $set: req.body
            }, {
              "new": true
            });

          case 4:
            _updateMovie = _context2.sent;
            res.status(201).json(_updateMovie);
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            res.status(500).json(_context2.t0);

          case 11:
            _context2.next = 14;
            break;

          case 13:
            res.status(403).json("Action not allowed");

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 8]]);
  }));

  return function updateMovie(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // DELETE movie


exports.updateMovie = updateMovie;

var deleteMovie = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!req.user.isAdmin) {
              _context3.next = 10;
              break;
            }

            _context3.prev = 1;
            _context3.next = 4;
            return _Movie["default"].findByIdAndDelete(req.params.id);

          case 4:
            res.status(201).json("Movie removed!");
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](1);
            res.status(403).json(_context3.t0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 7]]);
  }));

  return function deleteMovie(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); // GET movie


exports.deleteMovie = deleteMovie;

var getMovie = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var movie;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _Movie["default"].findById(req.params.id);

          case 3:
            movie = _context4.sent;
            res.status(201).json(movie);
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            res.status(403).json(_context4.t0);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function getMovie(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); // GET random movie / serie


exports.getMovie = getMovie;

var getRandomMovieOrSerie = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var type, movie;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            type = req.query.type; // Ex: /random?type=series

            _context5.prev = 1;

            if (!(type === "series")) {
              _context5.next = 8;
              break;
            }

            _context5.next = 5;
            return _Movie["default"].aggregate([{
              $match: {
                inSeries: true
              }
            }, // Search all documents with 'isSeries: true' property in Movie collection 
            {
              $sample: {
                size: 1
              }
            } // Return 1 doc. as example
            ]);

          case 5:
            movie = _context5.sent;
            _context5.next = 11;
            break;

          case 8:
            _context5.next = 10;
            return _Movie["default"].aggregate([{
              $match: {
                inSeries: false
              }
            }, // Search for 'isSeries: false' documents property in Movie collection 
            {
              $sample: {
                size: 1
              }
            } // Return 1 doc. as example
            ]);

          case 10:
            movie = _context5.sent;

          case 11:
            res.status(200).json(movie);
            _context5.next = 17;
            break;

          case 14:
            _context5.prev = 14;
            _context5.t0 = _context5["catch"](1);
            res.status(403).json(_context5.t0);

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 14]]);
  }));

  return function getRandomMovieOrSerie(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); // GET ALL moviee


exports.getRandomMovieOrSerie = getRandomMovieOrSerie;

var getAllMovies = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var movies;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (!req.user.isAdmin) {
              _context6.next = 13;
              break;
            }

            _context6.prev = 1;
            _context6.next = 4;
            return _Movie["default"].find();

          case 4:
            movies = _context6.sent;
            res.status(201).json(movies.reverse());
            _context6.next = 11;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](1);
            res.status(403).json(_context6.t0);

          case 11:
            _context6.next = 14;
            break;

          case 13:
            res.status(403).json("Action not allowed");

          case 14:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 8]]);
  }));

  return function getAllMovies(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getAllMovies = getAllMovies;