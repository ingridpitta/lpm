/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable no-underscore-dangle */
/* eslint-disable comma-dangle */
import express from "express";
import UserObject from "../../models/UserObject";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("private/register-object");
});

// For axios - list objects
router.get("/objects", async (req, res) => {
  try {
    const objects = await UserObject.find();

    res.status(200).json(objects);
  } catch (err) {
    throw new Error(err);
  }
});

// For axios - find one object
router.post("/objects/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const objects = await UserObject.findOne({ _id: id });

    res.status(200).json(objects);
  } catch (err) {
    throw new Error(err);
  }
});

// For axios - update object
router.post("/objects/update/:id", async (req, res) => {
  const { id } = req.params;
  const {
    origin,
    destination,
    departure,
    arrival,
    description,
    size,
    price
  } = req.body;

  try {
    await UserObject.updateOne(
      { _id: id },
      {
        origin,
        destination,
        departure,
        arrival,
        description,
        size,
        price
      }
    );

    res.status(200).json({ message: "OK" });
  } catch (err) {
    throw new Error(err);
  }
});

router.post("/", (req, res) => {
  const {
    origin,
    destination,
    departure,
    arrival,
    description,
    size,
    price
  } = req.body;

  const object = new UserObject({
    origin,
    destination,
    departure,
    arrival,
    description,
    size,
    price,
    user: req.user._id
  });

  UserObject.create(object)
    .then(() => {
      // Still have to create a confirmation step between those two routes (registerObject and Dashboard)
      res.redirect("/dashboard");
    })
    // eslint-disable-next-line arrow-parens
    .catch(err => {
      throw new Error(err);
    });
});

router.get("/detail/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const object = await UserObject.findOne({ _id: id });

    res.render("private/object-detail", { object });
  } catch (error) {
    throw new Error(error);
  }
});
export default router;
