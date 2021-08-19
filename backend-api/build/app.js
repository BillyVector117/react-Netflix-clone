"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _auth = _interopRequireDefault(require("./routes/auth"));

var _users = _interopRequireDefault(require("./routes/users"));

var _movies = _interopRequireDefault(require("./routes/movies"));

var _lists = _interopRequireDefault(require("./routes/lists"));

var _home = _interopRequireDefault(require("./routes/home"));

var app = (0, _express["default"])(); // SETTINGS

app.set('PORT', process.env.PORT || 6000); // MIDDLEWARES

app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
})); // ROUTES

app.use("/", _home["default"]);
app.use("/", _auth["default"]);
app.use("/", _users["default"]);
app.use("/", _movies["default"]);
app.use("/", _lists["default"]);
var _default = app;
exports["default"] = _default;