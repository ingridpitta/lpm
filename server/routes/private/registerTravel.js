import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("private/register-travel");
});

export default router;
