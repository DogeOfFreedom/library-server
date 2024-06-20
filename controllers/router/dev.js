/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const router = require("express").Router();
const fs = require("fs");
const { parse } = require("csv-parse");
const Author = require("../models/author");
const Book = require("../models/book");
const BookInstance = require("../models/bookinstance");
const Genre = require("../models/genre");
const mongoose = require("mongoose");

const populateGenres = async () => {
  const genres = [];
  await fs
    .createReadStream("data/genre.csv", { encoding: "utf8" })
    .pipe(parse({ delimiter: ",", from_line: 2, relax_quotes: true }))
    .on("data", (row) => genres.push(row))
    .on("end", async () => {
      for (let i = 0; i < genres.length; i++) {
        const genre = genres[i];
        const books = genre[1].split(",");
        const bookIds = await Promise.all(
          books.map(async (book) => {
            try {
              const id = await Book.findOne({ title: book }, { _id: 1 });
              return id;
            } catch (e) {
              return { ...book, e };
            }
          })
        );
        await Genre.create({
          name: genre[0],
          books: bookIds,
        });
      }
    });
};

const populateBookInstances = async () => {
  const bookInstances = [];
  await fs
    .createReadStream("data/book_instance.csv", { encoding: "utf8" })
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", (row) => bookInstances.push(row))
    .on("end", async () => {
      for (let i = 0; i < bookInstances.length; i++) {
        const bookInstance = bookInstances[i];
        const book = bookInstance[0];
        const id = await Book.findOne({ title: book }, { _id: 1 });
        await BookInstance.create({
          book: id,
          imprint: bookInstance[1],
          doa: new Date(bookInstance[2]),
          status: bookInstance[3],
        });
      }
    });
};

const populateBooks = async () => {
  const books = [];
  await fs
    .createReadStream("data/book.csv", { encoding: "utf8" })
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", (row) => books.push(row))
    .on("end", async () => {
      for (let i = 0; i < books.length; i++) {
        const book = books[i];
        const author = book[1];
        const id = await Author.findOne({ firstname: author }, { _id: 1 });
        const genre = book[4].split(",");
        await Book.create({
          title: book[0],
          author: id,
          summary: book[2],
          ISBN: book[3],
          genre,
        });
      }
      /*
      Book Instances and Genre require book objectId, must be populated after book collection
      */
      await populateBookInstances();
      await populateGenres();
    });
};

const populateAuthors = async () => {
  const authors = [];
  await fs
    .createReadStream("data/author.csv", { encoding: "utf8" })
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", (row) => authors.push(row))
    .on("end", async () => {
      for (let i = 0; i < authors.length; i++) {
        const author = authors[i];
        await Author.create({
          firstname: author[0],
          lastname: author[1],
          dob: new Date(author[2]),
          dod: new Date(author[3]),
        });
      }
      /*
      Books require author objectId, hence they can only be populated after the author collection is populated
      */
      await populateBooks();
    });
};

// Developer only
router.post("/insert_data", async (req, res) => {
  // read in data
  try {
    await populateAuthors();
    console.log("Inserted data");
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get("/", (req, res) => {
  res.json({
    message: "dev routes are active",
  });
});

router.delete("/del", async (req, res) => {
  // delete all collections
  console.log("delete all data");
  await mongoose.connection.db
    .listCollections()
    .toArray()
    .then((data) => {
      data
        .map((collection) => collection.name)
        .forEach((collectionName) =>
          mongoose.connection.db.dropCollection(collectionName)
        );
      res.sendStatus(200);
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(500);
    });
});

module.exports = router;
