"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _home = require("../controllers/home.controller");

var router = (0, _express.Router)();
router.get("/home", _home.home);
var _default = router;
exports["default"] = _default;