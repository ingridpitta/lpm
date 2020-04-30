import express from "express";
import Deal from "../../models/Deal";
import UserObject from "../../models/UserObject";
import Travel from "../../models/Travel";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("private/deal");
});

router.get("/object/:id", async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  try {
    const object = await UserObject.findOne({ _id: id });
    const travels = await Travel.find({ user: user._id });

    console.log({ travels });

    res.render("private/match-object", { object, travels });
  } catch (error) {
    throw new Error(error);
  }
});

router.get("/travel/:id", async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  try {
    const travel = await Travel.findOne({ _id: id });
    const objects = await UserObject.find({ user: user._id });

    console.log({ objects });

    res.render("private/match-travel", { travel, objects });
  } catch (error) {
    throw new Error(error);
  }
});

router.post("/", async (req, res) => {
  const { user2, travel, userObject } = req.body;

  const deal = new Deal({
    user1: req.user._id,
    user2,
    travel,
    userObject
  });

  Deal.create(deal)
    .then(() => {
      res.redirect("/dashboard");
    })
    // eslint-disable-next-line arrow-parens
    .catch(err => {
      throw new Error(err);
    });
});

export default router;
