import express from "express";
import Travel from "../../models/Travel";
import UserObject from "../../models/UserObject";

const router = express.Router();

router.get("/", async (req, res) => {
  const { user } = req;

  const travel = await Travel.find();
  const object = await UserObject.find();

  res.render("private/dashboard", {
    travel,
    object,
    user
  });
});

export default router;
