const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  categoryImage: {
    type: String,
  },
  categoryDescription: {
    type: String,
  },
  bgColorCode: {
    type: String,
  },
  linkColorCode: {
    type: String,
  },
});

const Category = mongoose.model("categories", categorySchema);

module.exports = Category;
