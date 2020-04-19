import express from "express";
import Travel from "../../models/Travel";
import UserObject from "../../models/UserObject";

const router = express.Router();

router.get("/", (req, res) => {
  const { user } = req;
  const data = async () => {
    const travel = await Travel.find();
    const object = await UserObject.find();
    return { travel, object };
  };

  data
    .then(infos => {
      const travels = infos.travel;
      const objects = infos.object;
      res.render("private/dashboard", {
        travels,
        objects,
        user
      });
    })
    .catch(err => {
      throw new Error(err);
    });
});

export default router;
