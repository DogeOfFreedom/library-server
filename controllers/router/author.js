const asyncHandler = require("express-async-handler");
const router = require("express").Router();
const { ObjectId } = require("mongodb");
const Author = require("../models/author");

router.get(
  "/all",
  asyncHandler(async (req, res) => {
    const data = await Author.where();
    res.json(JSON.stringify({ ...data }));
  })
);

router.get(
  "/count",
  asyncHandler(async (req, res) => {
    const count = await Author.where().countDocuments();
    res.json(JSON.stringify(count));
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const book = await Author.find({ _id: new ObjectId(id) });
    res.json(JSON.stringify(book));
  })
);

module.exports = router;
