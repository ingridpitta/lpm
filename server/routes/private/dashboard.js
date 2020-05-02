import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  const { user } = req;
  const apiKey = process.env.API_KEY;
  res.render("private/dashboard", {
    apiKey,
    user
  });
});

export default router;
