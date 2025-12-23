const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/Post");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/postsDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/getPosts", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.post("/addPosts", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  await post.save();
  res.json({ message: "Post Added Successfully" });
});

app.delete("/delPosts/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post Deleted Successfully" });
});

app.patch("/post/:id", async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    content: req.body.content
  });
  res.json({ message: "Post Updated Successfully" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
