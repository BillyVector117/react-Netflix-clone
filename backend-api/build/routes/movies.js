"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _movies = require("../controllers/movies.controller");

var _verifyToken = _interopRequireDefault(require("../middlewares/verifyToken"));

var router = (0, _express.Router)(); // CREATE movie

router.post("/movie&series", _verifyToken["default"], _movies.newMovie);
router.put("/movie&series/:id", _verifyToken["default"], _movies.updateMovie);
router["delete"]("/movie&series/:id", _verifyToken["default"], _movies.deleteMovie);
router.get("/movie&series/:id", _verifyToken["default"], _movies.getMovie);
router.get("/movies&series/random", _verifyToken["default"], _movies.getRandomMovieOrSerie);
router.get("/movies&series", _verifyToken["default"], _movies.getAllMovies);
var _default = router;
exports["default"] = _default;