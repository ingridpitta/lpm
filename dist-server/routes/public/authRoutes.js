"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/login', function (req, res) {
  res.render('public/login');
});
router.get('/signup', function (req, res) {
  res.render('public/signup');
});
router.get('/signup-step/', function (req, res) {
  res.render('public/signup-step');
});
var _default = router;
exports["default"] = _default;