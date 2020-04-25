import express from "express";
import UserObject from "../../models/UserObject";
import Travel from "../../models/Travel";

const router = express.Router();

router.get("/", async (req, res) => {
  const { user } = req;

  const travels = await Travel.find();
  const objects = await UserObject.find();

  res.render("private/dashboard", {
    travels,
    objects,
    user
  });
});

export default router;
