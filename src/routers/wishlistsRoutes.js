const express = require('express');

const { getWishlistsController, getOneWishlistController, postWishlistController, postManywishlistsConroller, updateWishlistController, deleteWishlistController, deleteWishlistsController } = require("../controllers/wishlistsControllers")
const WishlistsRouter = express.Router();


// get all wishlists by customer email
WishlistsRouter.get("/wishlist/:email", getWishlistsController )

// get one wishlist by id
WishlistsRouter.get("/wishlist/:id", getOneWishlistController )

// post a wishlist
WishlistsRouter.post("/wishlist", postWishlistController )

// post many wishlist
WishlistsRouter.post("/wishlist", postManywishlistsConroller )

// update a wishlist
WishlistsRouter.patch("/wishlist/:id", updateWishlistController )

// get all wishlists by customer email
WishlistsRouter.delete("/wishlist/:id", deleteWishlistController )

// get all wishlists by customer email
WishlistsRouter.delete("/wishlist/:email", deleteWishlistsController )


module.exports = WishlistsRouter;