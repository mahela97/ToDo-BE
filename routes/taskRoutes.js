const express = require("express");
const taskRouter = express.Router();

taskRouter.get("/",(req,res)=>{res.json({result: "gg"})});
taskRouter.get("/x",(req,res)=>{res.send("tasks ")});

module.exports = taskRouter;
