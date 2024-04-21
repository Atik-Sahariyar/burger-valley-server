const express = require('express');
const { getMyCartsController, getOneCartController, postCartController, postManyCartsConroller, updateCartController, deleteCartController, deleteMyCartsController } = require('../controllers/cartsControllers');

const cartsRouter = express.Router();


// get all carts by customer email
cartsRouter.get("/myCarts/:email", getMyCartsController )

// get one cart by id
cartsRouter.get("/myCarts/:id", getOneCartController )

// post a cart
cartsRouter.post("/myCarts", postCartController )

// post many cart
cartsRouter.post("/carts", postManyCartsConroller )

// update a cart
cartsRouter.patch("/myCarts/:id", updateCartController )

// get all carts by customer email
cartsRouter.delete("/myCarts/:id", deleteCartController )

// get all carts by customer email
cartsRouter.delete("/deleteCarts/:email", deleteMyCartsController )


module.exports = cartsRouter;