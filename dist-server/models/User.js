"use strict";

<<<<<<< HEAD
=======
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

>>>>>>> a2413d15cbb9dfbf27346160456c84b24f31924e
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

<<<<<<< HEAD
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

=======
>>>>>>> a2413d15cbb9dfbf27346160456c84b24f31924e
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
    required: true
  },
  image: {
    type: Buffer
  },
  rating: {
    type: Number
  },
  // created: { type: String }, Mongoose já tem getTimeStamp. Devemos ainda adicionar essa campo?
  status: {
    type: Boolean,
    required: true,
    "default": true
  }
});

var User = _mongoose["default"].model('User', userSchema);

var _default = User;
exports["default"] = _default;