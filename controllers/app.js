/* eslint-disable import/newline-after-import */
const express = require("express");
const app = express();
app.use(express.json());

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

const router = require("./router/general");
app.use(router);

const devRouter = require("./router/dev");
app.use("/dev", devRouter);
