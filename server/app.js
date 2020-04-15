import publicRoutes from "./routes/public/publicRoutes";
import express from "express";
import sassMiddleware from "node-sass-middleware";
import path from "path";
import dotenv from "dotenv";

dotenv.config()

const app = express();

//Middlewares
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(
  "/style",  
  sassMiddleware({
    src: __dirname + "/sass",
    dest: path.join(__dirname, "public"),
    debug: true,
    outputStyle: "compressed",
  })
);

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/", publicRoutes);

app.listen(process.env.PORT, () => console.log(`Running in PORT ${process.env.PORT}`));
