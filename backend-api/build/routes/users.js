"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = require("../controllers/user.controller");

var _verifyToken = _interopRequireDefault(require("../middlewares/verifyToken"));

var router = (0, _express.Router)(); // UPDATE

router.get("/users", _verifyToken["default"], _user.getAll);
router["delete"]("/users/:id", _verifyToken["default"], _user.deleteUser);
router.get("/users/:id", _user.getOne);
router.put("/users/:id", _verifyToken["default"], _user.updateBeingAdmin);
router.put("/:id", _verifyToken["default"], _user.update);
router.get("/stats", _verifyToken["default"], _user.getStats);
var _default = router;
exports["default"] = _default;