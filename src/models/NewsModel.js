const { default: mongoose } = require("mongoose");

const NewsSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  title: {
    type: String,
  },
  author_name: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  likes: Array,
  dislikes: Array,
  publish_date: {
    type: Date,
    default: Date.now(),
  },
  tags: Array,
  comments: [
    {
      userEmail: String,
      userName: String,
      comment: String,
    },
  ],
});

const News = mongoose.model("News", NewsSchema);

module.exports = News;
