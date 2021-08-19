"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _list = require("../controllers/list.controller");

var _verifyToken = _interopRequireDefault(require("../middlewares/verifyToken"));

var router = (0, _express.Router)();
router["delete"]("/lists/:id", _verifyToken["default"], _list.deleteList);
router.put("/lists/:id", _verifyToken["default"], _list.updateList);
router.get("/lists", _verifyToken["default"], _list.getAllLists);
router.post("/lists", _verifyToken["default"], _list.createList);
var _default = router;
exports["default"] = _default;