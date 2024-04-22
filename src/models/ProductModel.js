const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  ingredients: {
    type: [String],
    default: [],
  },
  reviews: {
    type: [String],
    default: [],
  },
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;
