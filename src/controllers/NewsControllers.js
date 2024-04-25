const News = require("../models/NewsModel");

// get all news controller
exports.getAllNews = async (req, res) => {
  try {
    console.log("news");
    const result = await News.find();
    res.send(result);
  } catch (error) {
    console.error("Error getting news data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get one news controller
exports.getOneNews = async (req, res) => {
  try {
    const result = await News.findById(req.params.id);
    res.send(result);
  } catch (error) {
    console.error("Error getting news data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// post news controller
exports.postNews = async (req, res) => {
  try {
    const newNews = req.body;
    const createNews = await News.create(newNews);
    res.status(201).json({ success: true, data: createNews });
  } catch (error) {
    console.error("Error post news data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// updae news controller
exports.updateNews = async (req, res) => {
  try {
    const result = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error update news data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete news controller
exports.deleteNews = async (req, res) => {
  try {
   const deleteNews = await News.findByIdAndDelete(req.params.id);
   res.send(deleteNews)
  } catch (error) {
    console.error("Error delete news data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
