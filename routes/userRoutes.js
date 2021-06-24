const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");

userRouter.post("/register",userController.registerUser);

module.exports = userRouter;
