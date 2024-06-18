const asyncHandler = require("express-async-handler");
const router = require("express").Router();
const { ObjectId } = require("mongodb");
const BookInstance = require("../models/bookinstance");

router.get(
  "/all",
  asyncHandler(async (req, res) => {
    const data = await BookInstance.where().populate("book");
    res.json(JSON.stringify({ ...data }));
  })
);

router.get(
  "/count",
  asyncHandler(async (req, res) => {
    const count = await BookInstance.where().countDocuments();
    res.json(JSON.stringify(count));
  })
);

router.get(
  "/count_available",
  asyncHandler(async (req, res) => {
    const count = await BookInstance.find({
      status: "Available",
    }).countDocuments();
    res.json(JSON.stringify(count));
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const book = await BookInstance.find({ _id: new ObjectId(id) });
    res.json(JSON.stringify(book));
  })
);

router.get(
  "/get_instances/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = await BookInstance.where({ book: new ObjectId(id) });
    res.json(JSON.stringify(data));
  })
);

router.put(
  "/:id/update",
  asyncHandler(async (req, res) => {
    const { book, imprint, doa, status, id } = req.body;
    const selectedBookInstance = await BookInstance.findById(
      ObjectId.createFromHexString(id)
    );
    selectedBookInstance.book = ObjectId.createFromHexString(book);
    selectedBookInstance.imprint = imprint;
    selectedBookInstance.doa = doa;
    selectedBookInstance.status = status;
    await selectedBookInstance.save();

    res.json({
      message: "Success",
    });
  })
);

router.post(
  "/create",
  asyncHandler(async (req, res) => {
    const { book, doa, imprint, status } = req.body;
    const bookId = ObjectId.createFromHexString(book);
    await BookInstance.create({
      book: bookId,
      imprint,
      doa: new Date(doa),
      status,
    });
    res.sendStatus(200);
  })
);

module.exports = router;
