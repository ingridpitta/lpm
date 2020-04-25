"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _nodeSassMiddleware = _interopRequireDefault(require("node-sass-middleware"));

var _path = _interopRequireDefault(require("path"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectFlash = _interopRequireDefault(require("connect-flash"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = require("passport-local");

var _passportFacebook = require("passport-facebook");

var _User = _interopRequireDefault(require("./models/User"));

var _publicRoutes = _interopRequireDefault(require("./routes/public/publicRoutes"));

var _authRoutes = _interopRequireDefault(require("./routes/public/authRoutes"));

var _chat = _interopRequireDefault(require("./routes/private/chat"));

var _dashboard = _interopRequireDefault(require("./routes/private/dashboard"));

var _profileInfos = _interopRequireDefault(require("./routes/private/profileInfos"));

var _registerObject = _interopRequireDefault(require("./routes/private/registerObject"));

var _objects = _interopRequireDefault(require("./routes/private/objects"));

var _registerTravel = _interopRequireDefault(require("./routes/private/registerTravel"));

var _travels = _interopRequireDefault(require("./routes/private/travels"));

var _deal = _interopRequireDefault(require("./routes/private/deal"));

// Routes and Models
_dotenv["default"].config();

var app = (0, _express["default"])(); // DB Connection

_mongoose["default"].connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}) // eslint-disable-next-line no-console
.then(function () {
  return console.log("Conectado ao Banco ".concat(process.env.MONGODB_URI));
})["catch"](function (err) {
  throw new Error(err);
}); // Middlewares
// Initialize Flash


app.use((0, _connectFlash["default"])()); // Passport

_passport["default"].serializeUser(function (user, callback) {
  callback(null, user._id);
});

_passport["default"].deserializeUser(function (id, callback) {
  _User["default"].findById(id).then(function (user) {
    callback(null, user);
  })["catch"](function (error) {
    callback(error);
  });
}); // Local Strategy


_passport["default"].use(new _passportLocal.Strategy({
  passReqToCallback: true
}, function (req, username, password, callback) {
  console.log({
    req: req,
    username: username
  });
  console.log("qualquer");

  _User["default"].findOne({
    username: username
  }).then(function (user) {
    if (!user || !_bcrypt["default"].compareSync(password, user.password)) {
      return callback(null, false, {
        message: "Nome de usuário ou senha incorretos"
      });
    }

    return callback(null, user);
  })["catch"](function (error) {
    callback(error);
  });
})); // Facebook Strategy


_passport["default"].use(new _passportFacebook.Strategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: "".concat(process.env.HOST_URL, "/auth/facebook/callback")
}, function (accessToken, refreshToken, profile, cb) {
  var id = profile.id,
      displayName = profile.displayName;

  _User["default"].findOrCreate({
    facebookId: id
  }, {
    name: displayName,
    username: "".concat(displayName.toLowerCase().split(" ").join("")),
    password: "".concat(displayName.toLowerCase().split(" ").join(""), ".").concat(id),
    email: "".concat(displayName.toLowerCase().split(" ").join(""), ".").concat(id, "@lpm.com.br")
  }, function (err, user) {
    return cb(err, user);
  });
})); // Sass Middleware


app.use("/styles", (0, _nodeSassMiddleware["default"])({
  src: "".concat(__dirname, "/sass"),
  dest: _path["default"].join(__dirname, "public", "styles"),
  debug: true,
  outputStyle: "compressed"
}));
app.use(_express["default"]["static"](_path["default"].join(__dirname, "public")));
app.set("views", _path["default"].join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
})); // Cookie

app.use((0, _expressSession["default"])({
  secret: process.env.SESSION_COOKIE_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: +process.env.SESSION_COOKIE_MAX_AGE
  }
}));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session()); // Public Routes

app.use("/", _publicRoutes["default"]);
app.use("/auth", _authRoutes["default"]); // Private Route Middleware

app.use(function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  res.redirect("/auth/login");
}); // Private Routes

app.use("/chat", _chat["default"]);
app.use("/dashboard", _dashboard["default"]);
app.use("/profile", _profileInfos["default"]);
app.use("/registerObject", _registerObject["default"]);
app.use("/objects", _objects["default"]);
app.use("/registerTravel", _registerTravel["default"]);
app.use("/travels", _travels["default"]);
app.use("/deal", _deal["default"]); // eslint-disable-next-line no-console

app.listen(process.env.PORT, function () {
  return console.log("Running in PORT ".concat(process.env.PORT));
});