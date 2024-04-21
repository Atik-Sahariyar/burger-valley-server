const express = require("express");
const { getReviewsByProductId, postReview, deleteReview , updateReview} = require("../controllers/reviewsControllers");
const reviewsRouter = express.Router();


// get all reviews by product_id 
reviewsRouter.get("/reviews/:productId", getReviewsByProductId);

// post a review 
reviewsRouter.post("/reviews", postReview);

// delete a review by id 
reviewsRouter.delete("/reviews/:id", deleteReview);

// update a review by id 
reviewsRouter.patch("/reviews/:id", updateReview);


module.exports = reviewsRouter;