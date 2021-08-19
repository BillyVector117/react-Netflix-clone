"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

_mongoose["default"].connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(function (event) {
  return console.log("Successfully connected to:", event.connection.name);
})["catch"](function (error) {
  return console.log("ERROR DETECTED: ", error);
});