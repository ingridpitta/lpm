"use strict";

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _nodeSassMiddleware = _interopRequireDefault(require("node-sass-middleware"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectMongodbSession = _interopRequireDefault(require("connect-mongodb-session"));

var _publicRoutes = _interopRequireDefault(require("./routes/public/publicRoutes"));

var _authRoutes = _interopRequireDefault(require("./routes/public/authRoutes"));

var _chat = _interopRequireDefault(require("./routes/private/chat"));

var _dashboard = _interopRequireDefault(require("./routes/private/dashboard"));

var _profile = _interopRequireDefault(require("./routes/private/profile"));

var _registerObject = _interopRequireDefault(require("./routes/private/registerObject"));

var _registerTravel = _interopRequireDefault(require("./routes/private/registerTravel"));

var _deal = _interopRequireDefault(require("./routes/private/deal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Routes
var MongoStore = (0, _connectMongodbSession["default"])(_expressSession["default"]);

_dotenv["default"].config();

var app = (0, _express["default"])(); // DB Connection

_mongoose["default"].connect('mongodb://localhost/task-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}) // eslint-disable-next-line no-console
.then(function () {
  return console.log('Conectado ao Banco de Dados');
})["catch"](function (err) {
  throw new Error(err);
}); // Middlewares
// Sass


app.use('/styles', (0, _nodeSassMiddleware["default"])({
  src: "".concat(__dirname, "/sass"),
  dest: _path["default"].join(__dirname, 'public', 'styles'),
  debug: true,
  outputStyle: 'compressed'
}));
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'public')));
app.set('views', _path["default"].join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(_bodyParser["default"].urlencoded({
  extended: true
})); // Cookie

app.use((0, _expressSession["default"])({
  secret: 'basic-auth-secret',
  cookie: {
    maxAge: 60000000
  },
  store: new MongoStore({
    mongooseConnection: _mongoose["default"].connection,
    ttl: 24 * 60 * 60 // 1 day

  })
})); // public routes

app.use('/', _publicRoutes["default"]);
app.use('/auth', _authRoutes["default"]); // private routes

app.use('/chat', _chat["default"]);
app.use('/dashboard', _dashboard["default"]);
app.use('/profile', _profile["default"]);
app.use('/registerObject', _registerObject["default"]);
app.use('/registerTravel', _registerTravel["default"]);
app.use('/deal', _deal["default"]); // eslint-disable-next-line no-console

app.listen(process.env.PORT, function () {
  return console.log("Running in PORT ".concat(process.env.PORT));
});