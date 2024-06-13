const mongoose = require("mongoose");

const author = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    dod: Date
})

module.exports = mongoose.model("Authors", author);