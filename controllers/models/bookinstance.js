const mongoose = require("mongoose");
const Book = require("./book");

const bookInstance = new mongoose.Schema({
  book: {
    type: mongoose.ObjectId,
    required: true,
    ref: Book,
  },
  imprint: {
    type: String,
    required: true,
  },
  doa: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Available", "Maintainence", "Loaned", "Reserved"],
    required: true,
  },
});

module.exports = mongoose.model("Book_Instances", bookInstance);
