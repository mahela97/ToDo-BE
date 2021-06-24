const mongoose = require("mongoose");
const DBUtil = require("../dbUtill/utills");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 255,
    },
    description: {
        type: String,
        required: true,
        max: 255,
        unique:true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: DBUtil.USER,
    },
},{timestamps:true});

module.exports = mongoose.model(DBUtil.TASK, taskSchema);
