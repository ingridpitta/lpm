"use strict";

var _publicRoutes = _interopRequireDefault(require("./routes/public/publicRoutes"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); //Middlewares

app.set('views', _path["default"].join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'public')));
app.use('/', _publicRoutes["default"]);
app.listen(3000, function () {
  return console.log('Running in PORT 3000');
});