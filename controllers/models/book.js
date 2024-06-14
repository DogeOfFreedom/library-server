const mongoose = require("mongoose");

const book = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  summary: String,
  ISBN: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const pattern = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
        return pattern.test(v);
      },
    },
  },
  genre: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Books", book);
