const express = require("express");
const router = express.Router();

// Import all routers
const routers = [
  require("./routers/CategoryRoutes"),
  require("./routers/ProductRoutes"),
  require("./routers/UserRouter"),
];

// Dynamically apply routers
routers.forEach((route) => router.use(route));

module.exports = router;
