const asyncHandler = require("express-async-handler");
const router = require("express").Router();
const { ObjectId } = require("mongodb");
const Book = require("../models/book");
const Author = require("../models/author");

router.get(
  "/all",
  asyncHandler(async (req, res) => {
    const data = await Book.where().populate("author");
    res.json(JSON.stringify({ ...data }));
  })
);

router.get(
  "/book_instances",
  asyncHandler(async (req, res) => {
    const data = await Book.find({}, { _id: 1, title: 1 });
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

router.post(
  "/create",
  asyncHandler(async (req, res) => {
    const { title, author, summary, ISBN, genres } = req.body;

    // Check if book exists
    const exists = await Book.exists({ title });

    if (exists) {
      res.json({
        message: "Genre Already Exists",
      });
    } else {
      const [firstname, lastname] = author.split(" ");
      const authorId = await Author.findOne(
        { firstname, lastname },
        { _id: 1 }
      );
      await Book.create({
        title,
        author: authorId,
        summary,
        ISBN,
        genre: genres,
      });
      res.sendStatus(200);
    }
  })
);

module.exports = router;
