import express from "express";
import Travel from "../../models/Travel";

const router = express.Router();

// For axios - list travels
router.get("/", async (req, res) => {
  try {
    const travels = await Travel.find();

    res.status(200).json(travels);
  } catch (err) {
    throw new Error(err);
  }
});

// For axios - find one travels
router.post("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const travels = await Travel.findOne({ _id: id });

    res.status(200).json(travels);
  } catch (err) {
    throw new Error(err);
  }
});

// For axios - update travels
router.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  const {
    origin,
    destination,
    departure,
    arrival,
    space,
    description,
    price
  } = req.body;

  try {
    await Travel.updateOne(
      { _id: id },
      {
        origin,
        destination,
        departure,
        arrival,
        description,
        space,
        price
      }
    );

    res.status(200).json({ message: "OK" });
  } catch (err) {
    throw new Error(err);
  }
});

export default router;
