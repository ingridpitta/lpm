"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseFindorcreate = _interopRequireDefault(require("mongoose-findorcreate"));

var Schema = _mongoose["default"].Schema;
var userSchema = new Schema({
  facebookId: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    "default": "http://placehold.it/120x120&text=image1"
  },
  rating: {
    type: Number,
    "default": 0
  },
  status: {
    type: Boolean,
    required: true,
    "default": true
  }
});
userSchema.plugin(_mongooseFindorcreate["default"]);

var User = _mongoose["default"].model("User", userSchema);

var _default = User;
exports["default"] = _default;