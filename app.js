const express = require("express");
const cors = require("cors");

const app = express();
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");

const mongoUrl = config.MONGODB_URI;

mongoose
  .connect(mongoUrl)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(
  middleware.morgan(
    ":method :url :status :res[content-length] - :response-time ms :data"
  )
);

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter); // Route handling via controller

app.use(middleware.requestLogger);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
