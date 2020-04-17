"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _passport = _interopRequireDefault(require("passport"));

var _User = _interopRequireDefault(require("../../models/User"));

var router = _express["default"].Router(); //Signup


router.get("/signup", function (req, res) {
  res.render("public/signup");
});
router.post("/signup", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, name, username, password, email, hashPassword, saltRouds, salt, newUser;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            //Still have to decide when - and how - save image and rating infos per user
            _req$body = req.body, name = _req$body.name, username = _req$body.username, password = _req$body.password, email = _req$body.email;

            if (password) {
              saltRouds = 10;
              salt = _bcrypt["default"].genSaltSync(saltRouds);
              hashPassword = _bcrypt["default"].hashSync(password, salt);
            }

            newUser = new _User["default"]({
              name: name,
              username: username,
              password: hashPassword,
              email: email
            });
            _context.next = 6;
            return newUser.save();

          case 6:
            res.redirect("/auth/login");
            _context.next = 20;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);

            if (!_context.t0.message.includes("required")) {
              _context.next = 14;
              break;
            }

            res.render("public/signup", {
              errorMessage: "Por favor, preencha todos os campos"
            });
            return _context.abrupt("return");

          case 14:
            if (!_context.t0.message.includes("username")) {
              _context.next = 17;
              break;
            }

            res.render("public/signup", {
              errorMessage: "Usuário já cadastrado. Por favor escolha outro nome de usuário"
            });
            return _context.abrupt("return");

          case 17:
            if (!_context.t0.message.includes("email")) {
              _context.next = 20;
              break;
            }

            res.render("public/signup", {
              errorMessage: "Email já cadastrado. Por favor insira outro email"
            });
            return _context.abrupt("return");

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); //Login

router.get("/login", function (req, res) {
  res.render("public/login", {
    errorMessage: req.flash("error")
  });
});
router.post("/login", _passport["default"].authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
})); // Logout

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/auth/login");
});
var _default = router;
exports["default"] = _default;