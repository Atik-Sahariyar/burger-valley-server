const Category = require("../models/CategoryModel");

// controller to create a new category
exports.createCategory = async (req, res, next) => {
  try {
    const { categoryName, categoryImage, categoryDescription } = req.body;
    const category = await Category.create({
      categoryName,
      categoryImage,
      categoryDescription,
    });
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

// controller to get all categories
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

// controller to get a single category by id
exports.getCategoryById = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

// controller to update a category by id
exports.updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const { categoryName, categoryImage, categoryDescription } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { categoryName, categoryImage, categoryDescription },
      { new: true }
    );
    if (!updatedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    next(error);
  }
};

// controller to delete a category by id
exports.deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, data: deletedCategory });
  } catch (error) {
    next(error);
  }
};
