import express from "express";
import sassMiddleware from "node-sass-middleware";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";

// Routes
import publicRoutes from "./routes/public/publicRoutes";
import authRoutes from "./routes/public/authRoutes";
import chat from "./routes/private/chat";
import dashboard from "./routes/private/dashboard";
import profile from "./routes/private/profile";
import registerObject from "./routes/private/registerObject";
import registerTravel from "./routes/private/registerTravel";
import deal from "./routes/private/deal";

const MongoStore = MongoDBStore(session);

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

// Sass
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
    secret: "basic-auth-secret",
    cookie: { maxAge: 60000000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    })
  })
);

// public routes
app.use("/", publicRoutes);
app.use("/auth", authRoutes);

// private routes
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
