const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/ProductController");

productRouter.get("/products", productController.getAllProducts);
productRouter.get("/products/:id", productController.getProductById);
productRouter.get("/products/category/:category", productController.getProductsByCategory);
productRouter.put("/products/:id", productController.updateProductById);
productRouter.delete("/products/:id", productController.deleteProductById);

module.exports = productRouter;
