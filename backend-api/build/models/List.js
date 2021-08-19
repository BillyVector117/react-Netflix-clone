"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema; // List properties

var ListSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String
  },
  genre: {
    type: String
  },
  content: {
    type: Array
  }
}, {
  timestamps: true
});
module.exports = mongoose.model("List", ListSchema);