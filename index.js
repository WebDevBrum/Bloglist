require("dotenv").config();
const http = require("http");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const morgan = require("morgan");
const cors = require("cors");

const config = require("./utils/config");

const Blog = require("./models/blog");

const mongoUrl = config.MONGODB_URI;
mongoose
  .connect(mongoUrl)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());

morgan.token("data", (req, res) => {
  const { body } = req; // destruct

  return JSON.stringify(body);
});

morgan((tokens, req, res) =>
  [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    // tokens.data(req, res)
  ].join(" ")
);

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
