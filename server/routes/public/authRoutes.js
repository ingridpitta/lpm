import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import User from "../../models/User";
import uploadCloud from "../../public/js/cloudinary";

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
    res.render("private/signup-step", { id: newUser._id });
    res.redirect(307, "/auth/login");
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

router.post(
  "/signup/photo/:id",
  uploadCloud.single("photo"),
  async (req, res) => {
    try {
      const { url } = req.file;
      const { id } = req.params;
      await User.findByIdAndUpdate(id, { image: url });
      res.redirect("/auth/signup/goal");
    } catch (error) {
      res.render("private/signup-step", {
        errorMessage:
          "Houve um problema em salvar sua foto. Tente novamente mais tarde"
      });
      console.log(error.message);
    }
  }
);

router.get("/signup/goal", (req, res) => {
  res.render("private/goal");
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

// Facebook Login
router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/auth/login" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

router.get("/match/:_id", (req, res) => {
  console.log(req.params._id);
  res.render("private/match");
});

export default router;
