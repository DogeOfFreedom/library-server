/* eslint-disable import/newline-after-import */
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const compression = require("compression");
const helmet = require("helmet");
app.use(express.json());

const cors = require("cors");
const allowedOrigin = process.env.ORIGIN || "http://127.0.0.1:4173";
app.use(cors({ origin: allowedOrigin }));

app.use(compression());
app.use(helmet());

// Rate limit to 20 req per minute
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
});

// Apply rate limit to all routes
app.use(limiter);

// Listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Connect to db
const devDbUrl =
  "mongodb+srv://admin:9O17ElFbdCvziw4Z@cluster0.sprmbnv.mongodb.net/library?retryWrites=true&w=majority&appName=Cluster0";
const mongoDB = process.env.MONGODB_URI || devDbUrl;
mongoose.connect(mongoDB).then(() => console.log("connected to db"));

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
if (process.env.ENV === "development") {
  app.use("/dev", devRouter);
}

const generalRouter = require("./router/general");
app.use("/", generalRouter);
