const express = require("express");
const auth = require("../middlewares/auth");
const taskController = require("../controller/taskController");
const taskRouter = express.Router();

taskRouter.post("/addCard",auth.checkToken,taskController.craeteTask);

module.exports = taskRouter;
