<<<<<<< HEAD
import path from 'path';
import express from 'express';
import publicRoutes from './routes/public/publicRoutes';

const app = express();

// Middlewares

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
=======
import publicRoutes from "./routes/public/publicRoutes";
import express from "express";
import sassMiddleware from "node-sass-middleware";
import path from "path";
import dotenv from "dotenv";

dotenv.config()

const app = express();

//Middlewares
app.use(
  "/styles",  
  sassMiddleware({
    src: __dirname + "/sass",
    dest: path.join(__dirname, "public", "styles"),
    debug: true,
    outputStyle: "compressed",
  })
);
  
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
>>>>>>> 739cc8c9519a4a66ef9f12b0954a8fdc4a04efc1

app.use("/", publicRoutes);

<<<<<<< HEAD
console.log('teste');

app.listen(3000, () => (console.log('Running in PORT 3000')));
=======
app.listen(process.env.PORT, () => console.log(`Running in PORT ${process.env.PORT}`));
>>>>>>> 739cc8c9519a4a66ef9f12b0954a8fdc4a04efc1
