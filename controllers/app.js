/* eslint-disable import/newline-after-import */
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

const cors = require("cors");
app.use(cors({ origin: "http://127.0.0.1:5173" }));

// Listen
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Connect to db
const url =
  "mongodb+srv://admin:9O17ElFbdCvziw4Z@cluster0.sprmbnv.mongodb.net/library?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(url).then(() => console.log("connected to db"));

// Routes
const bookRouter = require("./router/book");
app.use("/book", bookRouter);

const authorRouter = require("./router/author");
app.use("/author", authorRouter);

const genreRouter = require("./router/genre");
app.use("/genre", genreRouter);

const bookInstanceRouter = require("./router/bookinstance");
app.use("/book_instance", bookInstanceRouter);

const devRouter = require("./router/dev");
app.use("/dev", devRouter);
