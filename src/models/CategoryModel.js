const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  categoryImage: {
    type: String,
    default: "",
  },
  categoryDescription: {
    type: String,
    default: "",
  },
});

const Category = mongoose.model("categories", categorySchema);

module.exports = Category;
