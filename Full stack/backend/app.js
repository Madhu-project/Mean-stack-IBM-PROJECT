//express is here
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

mongoose
  .connect("mongodb://localhost:27017/node-angular", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("connection failed");
  });

const Post = require("./models/post");
const {
  createShorthandPropertyAssignment,
  createPostfix,
} = require("typescript");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //for cors any server access
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  // const posts = req.body;
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  console.log(post);
  post.save().then((createdPost) => {
    console.log(createdPost);
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id,
    });
  }); //provided my mongoose ..mongoose create write query into the database
});

app.get("/api/posts", (req, res, next) => {
  // res.send("Hello from express!");
  // const posts = [
  //   {
  //     id: "fad123451",
  //     title: "First server-side post",
  //     content: "This is coming from server of id 1",
  //   },
  //   {
  //     id: "Ta34517723",
  //     title: "Second server-side post",
  //     content: "This is coming from server of id 2",
  //   },
  // ];
  Post.find().then((documents) => {
    res
      .status(200)
      .json({ message: "Posts fetched successfully!", posts: documents });
    console.log(documents);
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  console.log(req.params.id);

  Post.deleteOne({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Post deleted!" });
    })
    .catch(() => {
      console.error(req.params.id);
    });
});

module.exports = app;
