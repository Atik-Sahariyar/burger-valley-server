const { default: mongoose } = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title: String,
  author_name: String,
  category: String,
  image: String,
  likes: Number,
  dislikes: Number,
  publish_date: {
    type: Date,
    default: Date.now()
  },
  tags: Array,
  comments: [
    {
      username: String,
      userEmail: String,
      comment: String
    }
  ],
  description: {
    paragraphs: Array,
    subtitles: [
      {
        subtitle: String, 
        content: String
      }
    ]
  },
  conclusion: String,
});

const News = mongoose.model("News", NewsSchema);

module.exports = News;

