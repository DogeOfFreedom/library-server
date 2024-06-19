const asyncHandler = require("express-async-handler");
const router = require("express").Router();
const { ObjectId } = require("mongodb");
const Author = require("../models/author");
const author = require("../models/author");

router.get(
  "/all",
  asyncHandler(async (req, res) => {
    const data = await Author.where();
    res.json(JSON.stringify({ ...data }));
  })
);

router.get(
  "/names",
  asyncHandler(async (req, res) => {
    const data = await Author.find({}, { firstname: 1, lastname: 1 });
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

router.put(
  "/:id/update",
  asyncHandler(async (req, res) => {
    const { firstname, lastname, dob, dod, id } = req.body;
    const selectedAuthor = await Author.findById(
      ObjectId.createFromHexString(id)
    );
    selectedAuthor.firstname = firstname;
    selectedAuthor.lastname = lastname;
    selectedAuthor.dob = dob;
    selectedAuthor.dod = dod;
    await selectedAuthor.save();

    res.json({
      message: "Success",
    });
  })
);

router.delete(
  "/:id/delete",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Author.deleteOne({ _id: id });
    res.json({
      message: "Successfully deleted",
    });
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

router.post(
  "/create",
  asyncHandler(async (req, res) => {
    const { firstname, lastname, dob, dod } = req.body;
    await author.create({ firstname, lastname, dob, dod });
    res.json({
      message: "Success",
    });
  })
);

module.exports = router;
