var express = require("express");
var logger = require("morgan");
var homeRouter = require("./routes/homeRoute");
var dotenv = require("dotenv");
const mongoose = require("mongoose");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

dotenv.config({
  path: "./config.env",
});

mongoose
  .connect(process.env.LOCAL_DATABASE)
  .then(() => console.log("connected to db"));

app.use("/", homeRouter);

const port = 4000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
