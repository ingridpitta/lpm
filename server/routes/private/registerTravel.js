/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import express from "express";
import Travel from "../../models/Travel";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("private/register-travel");
});

router.post("/", (req, res) => {
  const {
    origin,
    destination,
    departure,
    arrival,
    space,
    description,
    price
  } = req.body;

  const travel = new Travel({
    origin,
    destination,
    departure,
    arrival,
    space,
    description,
    price,
    user: req.user._id
  });

  Travel.create(travel)
    .then(() => {
      // Still have to create a confirmation step between those two routes (registerTravel and Dashboard)
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
    const travel = await Travel.findOne({ _id: id });

    res.render("private/travel-detail", { travel });
  } catch (error) {
    throw new Error(error);
  }
});


export default router;
