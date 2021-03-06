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
import { Strategy as FacebookStrategy } from "passport-facebook";

// Routes and Models
import User from "./models/User";
import publicRoutes from "./routes/public/publicRoutes";
import authRoutes from "./routes/public/authRoutes";
import chat from "./routes/private/chat";
import dashboard from "./routes/private/dashboard";
import profileInfos from "./routes/private/profileInfos";
import registerObject from "./routes/private/registerObject";
import objects from "./routes/private/objects";
import registerTravel from "./routes/private/registerTravel";
import travels from "./routes/private/travels";
import deal from "./routes/private/deal";

dotenv.config();

const app = express();

// DB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  // eslint-disable-next-line no-console
  .then(() => console.log(`Conectado ao Banco ${process.env.MONGODB_URI}`))
  .catch(err => {
    throw new Error(err);
  });

// Middlewares

// Initialize Flash
app.use(flash());

// Passport
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

// Local Strategy
passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, callback) => {
      console.log({ req, username });
      User.findOne({ username })
        .then(user => {
          if (!user || !bcrypt.compareSync(password, user.password)) {
            return callback(null, false, {
              message: "Nome de usuário ou senha incorretos"
            });
          }
          return callback(null, user);
        })
        .catch(error => {
          callback(error);
        });
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: `${process.env.HOST_URL}/auth/facebook/callback`
    },
    (accessToken, refreshToken, profile, cb) => {
      const { id, displayName } = profile;
      User.findOrCreate(
        { facebookId: id },
        {
          name: displayName,
          username: `${displayName
            .toLowerCase()
            .split(" ")
            .join("")}`,
          password: `${displayName
            .toLowerCase()
            .split(" ")
            .join("")}.${id}`,
          email: `${displayName
            .toLowerCase()
            .split(" ")
            .join("")}.${id}@lpm.com.br`
        },
        (err, user) => cb(err, user)
      );
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
app.use(bodyParser.json());
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
app.use("/profile", profileInfos);
app.use("/registerObject", registerObject);
app.use("/objects", objects);
app.use("/registerTravel", registerTravel);
app.use("/travels", travels);
app.use("/deal", deal);

// eslint-disable-next-line no-console
app.listen(process.env.PORT, () =>
  console.log(`Running in PORT ${process.env.PORT}`)
);
