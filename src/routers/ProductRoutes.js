const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/ProductController");

// create new product router
productRouter.post("/products", productController.createProduct);

// get all product router
productRouter.get("/products", productController.getAllProducts);

// get a product by id router
productRouter.get("/products/:id", productController.getProductById);

// get products by category router
productRouter.get(
  "/products/category/:category",
  productController.getProductsByCategory
);

// update product details by id router
productRouter.put("/update/products/:id", productController.updateProductById);

// delete a product router
productRouter.delete("/products/:id", productController.deleteProductById);

// get discounted product by category router
productRouter.get(
  "/products/discounted/category/:category",
  productController.getDiscountedProductsByCategory
);

// get paginated products by category router
productRouter.get(
  "/products/category/:category/paginated",
  productController.getPaginatedProductsByCategory
);

module.exports = productRouter;
