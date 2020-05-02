import express from "express";
import UserObject from "../../models/UserObject";

const router = express.Router();

// For axios - list objects
router.get("/", async (req, res) => {
  try {
    const objects = await UserObject.find();

    res.status(200).json(objects);
  } catch (err) {
    throw new Error(err);
  }
});

// For axios - find one object
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const objects = await UserObject.findOne({ _id: id });

    res.status(200).json(objects);
  } catch (err) {
    throw new Error(err);
  }
});

// For axios - update object
router.post("/update/:id", async (req, res) => {
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

export default router;
