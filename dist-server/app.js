"use strict";

var _publicRoutes = _interopRequireDefault(require("./routes/public/publicRoutes"));

var _express = _interopRequireDefault(require("express"));

var _nodeSassMiddleware = _interopRequireDefault(require("node-sass-middleware"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); //Middlewares

app.set("views", _path["default"].join(__dirname, "views"));
app.set("view engine", "hbs");
app.use("/style", (0, _nodeSassMiddleware["default"])({
  /* Options */
  src: __dirname + "/sass",
  dest: _path["default"].join(__dirname, "public"),
  debug: true,
  outputStyle: "compressed"
})); // Note: you must place sass-middleware *before* `express.static` or else it will
// not work.

app.use("/public", _express["default"]["static"](_path["default"].join(__dirname, "public"))); // app.use(express.static(path.join(__dirname, "public")));

app.use("/", _publicRoutes["default"]);
app.listen(3001, function () {
  return console.log("Running in PORT 3001");
});