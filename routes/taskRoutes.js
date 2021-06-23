const express = require("express");
const taskRouter = express.Router();

taskRouter.get("/",(req,res)=>{console.log("taskRoute")});

module.exports = taskRouter;
