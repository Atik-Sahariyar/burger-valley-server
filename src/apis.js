const express = require("express");
const router = express.Router();

// Import all routers
const routers = [
    require("./routers/CategoryRoutes"),
    require("./routers/NewsRoutes"),
    require("./routers/cartsRoutes"),
    require("./routers/reviewsRoutes"),
];

// Dynamically apply routers
routers.forEach((route) => router.use(route));

module.exports = router;
