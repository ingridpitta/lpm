import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import User from "../../models/User";

const router = express.Router();

// Signup
router.get("/signup", (req, res) => {
  res.render("public/signup");
});

router.post("/signup", async (req, res) => {
  try {
    // Still have to decide when - and how - save image and rating infos per user
    const { name, username, password, email } = req.body;
    let hashPassword;

    if (password) {
      const saltRouds = 10;
      const salt = bcrypt.genSaltSync(saltRouds);
      hashPassword = bcrypt.hashSync(password, salt);
    }

    const newUser = new User({
      name,
      username,
      password: hashPassword,
      email
    });
    await newUser.save();
    res.render("private/signup-step");
  } catch (error) {
    if (error.message.includes("required")) {
      res.render("public/signup", {
        errorMessage: "Email já cadastrado. Por favor insira outro email"
      });
      return;
    }

    if (error.message.includes("email")) {
      res.render("public/signup", {
        errorMessage: "Email já cadastrado. Por favor insira outro email"
      });
      return;
    }

    if (error.message.includes("username")) {
      res.render("public/signup", {
        errorMessage:
          "Nome de usuário já cadastrado. Por favor escolha outro nome de usuário"
      });
    }
  }
});

// Login
router.get("/login", (req, res) => {
  res.render("public/login", { errorMessage: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

export default router;
