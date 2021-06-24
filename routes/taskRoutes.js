const express = require("express");
const taskRouter = express.Router();

taskRouter.post("/",(req,res)=>{res.json({result: "gg"})});

module.exports = taskRouter;
