const asyncHandler = require("express-async-handler");
const router = require("express").Router();
const { ObjectId } = require("mongodb");
const Book = require("../models/book");

router.get(
  "/all",
  asyncHandler(async (req, res) => {
    const data = await Book.where().populate("author");
    res.json(JSON.stringify({ ...data }));
  })
);

router.get(
  "/count",
  asyncHandler(async (req, res) => {
    const count = await Book.where().countDocuments();
    res.json(JSON.stringify(count));
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const book = await Book.find({ _id: new ObjectId(id) }).populate("author");
    res.json(JSON.stringify(book));
  })
);

router.get(
  "/author/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const books = await Book.find({ author: new ObjectId(id) });
    res.json(JSON.stringify(books));
  })
);

module.exports = router;
