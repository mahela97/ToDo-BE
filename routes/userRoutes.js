const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");

userRouter.get("/register",userController.registerUser);

module.exports = userRouter;
