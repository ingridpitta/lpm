"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var messageSchema = new Schema({
  user1: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'User',
    required: true
  },
  user2: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'User',
    required: true
  },
  travel: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'Travel',
    required: true
  },
  userObject: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'UserObject',
    required: true
  }
});

var Message = _mongoose["default"].model('Message', messageSchema);

var _default = Message;
exports["default"] = _default;