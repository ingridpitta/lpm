import express from "express";
import sassMiddleware from "node-sass-middleware";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import session from "express-session";
import flash from "connect-flash";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

// Routes and Models
import User from "./models/User";
import publicRoutes from "./routes/public/publicRoutes";
import authRoutes from "./routes/public/authRoutes";
import chat from "./routes/private/chat";
import dashboard from "./routes/private/dashboard";
import profile from "./routes/private/profile";
import registerObject from "./routes/private/registerObject";
import registerTravel from "./routes/private/registerTravel";
import deal from "./routes/private/deal";

dotenv.config();

const app = express();

// DB Connection
mongoose
  .connect("mongodb://localhost/task-manager", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  // eslint-disable-next-line no-console
  .then(() => console.log("Conectado ao Banco de Dados"))
  .catch(err => {
    throw new Error(err);
  });

// Middlewares

//Initialize Flash
app.use(flash());

//Passport
passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then(user => {
      callback(null, user);
    })
    .catch(error => {
      callback(error);
    });
});

passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, callback) => {
      User.findOne({ username })
        .then(user => {
          if (!user || !bcrypt.compareSync(password, user.password)) {
            return callback(null, false, {
              message: "Nome de usuário ou senha incorretos"
            });
          }
          callback(null, user);
        })
        .catch(error => {
          callback(error);
        });
    }
  )
);

// Sass Middleware
app.use(
  "/styles",
  sassMiddleware({
    src: `${__dirname}/sass`,
    dest: path.join(__dirname, "public", "styles"),
    debug: true,
    outputStyle: "compressed"
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));

// Cookie
app.use(
  session({
    secret: process.env.SESSION_COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: +process.env.SESSION_COOKIE_MAX_AGE }
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Public Routes
app.use("/", publicRoutes);
app.use("/auth", authRoutes);

// Private Route Middleware
app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  res.redirect("/auth/login");
});

// Private Routes
app.use("/chat", chat);
app.use("/dashboard", dashboard);
app.use("/profile", profile);
app.use("/registerObject", registerObject);
app.use("/registerTravel", registerTravel);
app.use("/deal", deal);

// eslint-disable-next-line no-console
app.listen(process.env.PORT, () =>
  console.log(`Running in PORT ${process.env.PORT}`)
);
