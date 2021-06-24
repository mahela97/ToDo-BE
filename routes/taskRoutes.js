const express = require("express");
const auth = require("../middlewares/auth");
const taskController = require("../controller/taskController");
const taskRouter = express.Router();

taskRouter.post("/addTask",auth.checkToken,taskController.createTask);
taskRouter.get("/getAllTasks",auth.checkToken,taskController.getAllTasks);

module.exports = taskRouter;
