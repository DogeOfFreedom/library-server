const asyncHandler = require("express-async-handler");
const router = require("express").Router();
const Genre = require("../models/genre");

router.get(
  "/all",
  asyncHandler(async (req, res) => {
    const data = await Genre.where().populate("books");
    res.json(JSON.stringify({ ...data }));
  })
);

router.get(
  "/count",
  asyncHandler(async (req, res) => {
    const count = await Genre.where().countDocuments();
    res.json(JSON.stringify(count));
  })
);

router.get(
  "/names",
  asyncHandler(async (req, res) => {
    const data = await Genre.where().select("name");
    res.json(JSON.stringify({ ...data }));
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const genre = await Genre.find({ _id: id }).populate("books");
    res.json(JSON.stringify(genre));
  })
);

router.post(
  "/create",
  asyncHandler(async (req, res) => {
    const genre = req.body.genre.toLowerCase();
    console.log(genre);

    // Check if genre already exists
    const exists = await Genre.exists({ name: genre });
    if (exists) {
      res.json({
        message: "Genre Already Exists",
      });
    } else {
      // Make new genre
      await Genre.create({
        name: genre,
      });
      res.sendStatus(200);
    }
  })
);

module.exports = router;
