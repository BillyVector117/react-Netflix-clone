"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema; // Movie properties

var MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  imagePath: {
    type: String,
    "default": "/assets/newUser.jpg"
  },
  imageSm: {
    type: String,
    "default": "/assets/newUser.jpg"
  },
  imageTitle: {
    type: String,
    "default": "/assets/newUser.jpg"
  },
  trailer: {
    type: String
  },
  video: {
    type: String
  },
  year: {
    type: String
  },
  limit: {
    type: Number
  },
  genre: {
    type: String
  },
  inSeries: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true
});
module.exports = mongoose.model("Movie", MovieSchema);