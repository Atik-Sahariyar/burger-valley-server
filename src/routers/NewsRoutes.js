const express = require("express");
const { getAllNews, getOneNews, postNews, updateNews, deleteNews } = require("../controllers/NewsControllers");
const newsRouter = express.Router();


// get all news 
newsRouter.get("/news", getAllNews);

// get one news by id 
newsRouter.get("/news/:id", getOneNews);

// post a news 
newsRouter.post("/news", postNews);

// update a news 
newsRouter.patch("/news/:id", updateNews);

// delete a news 
newsRouter.patch("/news/:id", deleteNews);


module.exports = newsRouter