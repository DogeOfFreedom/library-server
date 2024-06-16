const mongoose = require("mongoose");
const Book = require("./book");

const genre = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  books: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: Book,
  },
});

module.exports = mongoose.model("Genres", genre);
