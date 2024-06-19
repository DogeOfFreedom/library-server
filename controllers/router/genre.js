const asyncHandler = require("express-async-handler");
const router = require("express").Router();
const Genre = require("../models/genre");
const { ObjectId } = require("mongodb");

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
  "/:id/name",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const genre = await Genre.find({ _id: id }, { name: 1 });
    res.json(JSON.stringify(genre));
  })
);

router.get(
  "/:id/books",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const genre = await Genre.find({ _id: id }, { books: 1 }).populate("books");
    res.json(JSON.stringify(genre));
  })
);

router.put(
  "/:id/update",
  asyncHandler(async (req, res) => {
    const { name, id } = req.body;
    const exists = await Genre.findOne({ name });
    if (exists) {
      res.json({
        message: "Genre already exists",
      });
    } else {
      const selectedAuthor = await Genre.findOne({
        _id: ObjectId.createFromHexString(id),
      });
      selectedAuthor.name = name;
      await selectedAuthor.save();

      res.json({
        message: "Success",
      });
    }
  })
);

router.delete(
  "/:id/delete",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Genre.deleteOne({ _id: id });
    res.json({
      message: "Successfully deleted",
    });
  })
);

router.post(
  "/create",
  asyncHandler(async (req, res) => {
    const genre = req.body.name.toLowerCase();

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
      res.json({
        message: "Success",
      });
    }
  })
);

module.exports = router;
