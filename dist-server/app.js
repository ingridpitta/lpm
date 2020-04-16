"use strict";

var _publicRoutes = _interopRequireDefault(require("./routes/public/publicRoutes"));

var _express = _interopRequireDefault(require("express"));

var _nodeSassMiddleware = _interopRequireDefault(require("node-sass-middleware"));

var _path = _interopRequireDefault(require("path"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])(); //Middlewares

app.set("views", _path["default"].join(__dirname, "views"));
app.set("view engine", "hbs");
app.use("/style", (0, _nodeSassMiddleware["default"])({
  src: __dirname + "/sass",
  dest: _path["default"].join(__dirname, "public"),
  debug: true,
  outputStyle: "compressed"
}));
app.use("/public", _express["default"]["static"](_path["default"].join(__dirname, "public")));
app.use("/", _publicRoutes["default"]);
app.listen(process.env.PORT, function () {
  return console.log("Running in PORT ".concat(process.env.PORT));
});