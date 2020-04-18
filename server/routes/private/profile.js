import express from "express";
import Travel from "../../models/Travel";
import UserObject from "../../models/UserObject";
import Message from "../../models/Message";
import Deal from "../../models/Deal";

const router = express.Router();

router.get("/", (req, res) => {
  const { user } = req;
  const data = async () => {
    const travel = await Travel.find({ user: user.id });
    const object = await UserObject.find({ user: user.id });
    const message = await Message.find({ user: user.id });
    const deal = await Deal.find({ user: user.id });
    return { travel, object, message, deal };
  };

  data
    .then(infos => {
      const travels = infos.travel;
      const objects = infos.object;
      const messages = infos.message;
      const deals = infos.deal;
      res.render("private/profile", {
        travels,
        objects,
        messages,
        deals,
        user
      });
    })
    .catch(err => {
      throw new Error(err);
    });
});

export default router;
