const express = require("express");
const categoryRouter = express.Router();
const CategoryController = require("../controllers/CategoryController");

// create a new category
categoryRouter.post("/category", CategoryController.createCategory);

// get all categories
categoryRouter.get("/category", CategoryController.getAllCategories);

// get a single category by id
categoryRouter.get("/category/:id", CategoryController.getCategoryById);

// update a category by id
categoryRouter.put("/update/category/:id", CategoryController.updateCategory);

// delete a category by id
categoryRouter.delete("/category/:id", CategoryController.deleteCategory);

module.exports = categoryRouter;
