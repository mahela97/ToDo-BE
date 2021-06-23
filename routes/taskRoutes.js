const express = require("express");
const taskRouter = express.Router();

taskRouter.get("/",(req,res)=>{res.send("task")});

module.exports = taskRouter;
