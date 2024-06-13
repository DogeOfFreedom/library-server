const mongoose = require("mongoose");

const book = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    summary: String,
    ISBN: {
        type: String,
        required: true
    },
    Genre: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Books", book);