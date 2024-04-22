const express = require("express");
const userController = require("../controllers/UserController");
const authMiddleware = require("../middlewares/authMiddleware");

const userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/refresh-token", userController.refreshToken);
userRouter.post("/logout", userController.logout);
userRouter.post("/logout", userController.logout);

// protected routes
userRouter.get("/profile", authMiddleware, userController.getUserInfo);
userRouter.put("/profile", authMiddleware, userController.updateUserInfo);
userRouter.delete("/profile", authMiddleware, userController.deleteUser);

module.exports = userRouter;
