import publicRoutes from "./routes/public/publicRoutes";
import express from "express";
import sassMiddleware from "node-sass-middleware";
import path from "path";

const app = express();

//Middlewares
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(
  "/style",  
  sassMiddleware({
    /* Options */
    src: __dirname + "/sass",
    dest: path.join(__dirname, "public"),
    debug: true,
    outputStyle: "compressed",
  })
);
// Note: you must place sass-middleware *before* `express.static` or else it will
// not work.
app.use("/public", express.static(path.join(__dirname, "public")));

// app.use(express.static(path.join(__dirname, "public")));

app.use("/", publicRoutes);

app.listen(3001, () => console.log("Running in PORT 3001"));
