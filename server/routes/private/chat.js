import express from "express";
// import Message from "../../models/message";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("private/chat");
});

export default router;
