"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

// This middleware verify for existing valid token at req.headers for each request
function verifyMyToken(req, res, next) {
  var authTokenHeader = req.headers.authtoken;
  console.log("Your header token: ", authTokenHeader);

  if (authTokenHeader) {
    var token = authTokenHeader.split(" ")[1]; // Extract only token from "Bearer 'tokenHere'"

    _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY, function (error, user) {
      if (error) res.status(403).json("Invalid Token!");
      req.user = user; // user is Data provided by jwt

      next();
    });
  } else {
    return res.status(401).json("Missing permission");
  }
}

var _default = verifyMyToken;
exports["default"] = _default;