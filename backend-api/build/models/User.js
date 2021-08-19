"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema; // const bcryptjs = require("bcryptjs");
// User properties

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    "default": "/assets/newUser.jpg"
  },
  isAdmin: {
    type: Boolean,
    "default": false
  },
  gender: {
    type: String,
    "default": "other"
  }
}, {
  timestamps: true
});
/* // Encrypt password
UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  const hash = bcryptjs.hash(password, salt);
  return hash;
};
// Validate Password
UserSchema.methods.matchPassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
}; */
// Export Schema/Model as 'User'

module.exports = mongoose.model("User", UserSchema);