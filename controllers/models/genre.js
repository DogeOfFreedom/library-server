const mongoose = require("mongoose");

const genre = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  books: {
    type: [mongoose.Schema.Types.ObjectId],
  },
});

module.exports = mongoose.model("Genres", genre);
