const asyncHandler = require("express-async-handler");
const router = require("express").Router();
const { ObjectId } = require("mongodb");
const Genre = require("../models/genre");
const Book = require("../models/book");

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
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const genre = await Genre.find({ _id: id }).populate("books");
    res.json(JSON.stringify(genre));
  })
);

module.exports = router;
