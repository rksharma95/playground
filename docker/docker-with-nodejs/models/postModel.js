const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "Title is required for a post"],
  },
  body: {
    type: String,
    required: [true, "A post must have a body"],
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;