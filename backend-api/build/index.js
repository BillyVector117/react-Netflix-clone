"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

require("./database");

_app["default"].get("PORT");

_app["default"].listen(_app["default"].get("PORT"));

console.log("Server is running on PORT: ", _app["default"].get('PORT'));