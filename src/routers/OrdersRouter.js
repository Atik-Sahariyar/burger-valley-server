const express = require("express");
const { getMyOrders, getTotalBooksSold } = require("../controllers/OrdersControllers");

const OrdersRouter = express.Router();


// get my orders by email
OrdersRouter.get("/my-orders/:email", getMyOrders);

OrdersRouter.get("/total-orders", getTotalBooksSold);


module.exports = OrdersRouter;