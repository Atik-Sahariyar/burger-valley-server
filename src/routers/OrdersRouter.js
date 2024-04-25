const express = require("express");
const { getMyOrders, getTotalProductsOrder, getTotalProductsSold, getTotalRevenue, getCustomers, getRecentTenOrder, getTodaysSalesAndOrders } = require("../controllers/OrdersControllers");

const OrdersRouter = express.Router();


// get my orders by email
OrdersRouter.get("/my-orders/:email", getMyOrders);

// get total orders
OrdersRouter.get("/total-orders", getTotalProductsOrder);


// get total salse
OrdersRouter.get("/total-sales", getTotalProductsSold);

// get total salse
OrdersRouter.get("/total-revenue", getTotalRevenue);

// get total customers
OrdersRouter.get("/customers", getCustomers);

// get total recent 10 order
OrdersRouter.get("/recentTenOrder", getRecentTenOrder);

// get total recent 10 order
OrdersRouter.get("/todaysSalesAndOrders", getTodaysSalesAndOrders);


module.exports = OrdersRouter;