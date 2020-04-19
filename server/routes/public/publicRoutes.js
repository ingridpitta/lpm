import express from "express";

const router = express.Router();

//Home Page
router.get("/", (req, res) => {
  res.render("public/index");
});

export default router;
