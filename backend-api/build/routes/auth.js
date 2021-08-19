"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = require("../controllers/auth.controller");

var router = (0, _express.Router)();
router.post("/register", _auth.register);
router.post("/login", _auth.login);
var _default = router;
exports["default"] = _default;