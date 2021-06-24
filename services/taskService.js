const Task = require("../schemas/task.schema");

module.exports = {
    saveTask:async(data,id)=>{
        const task = new Task (data);
        const result = await task.save();
        return result;
    },
    getAllTasks:async(query)=>{

        const result = await Task.find({$regex:{}})
    }
}