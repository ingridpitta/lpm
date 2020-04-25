import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  const { user } = req;

  res.render("private/dashboard", {
    user
  });
});

export default router;
