const Task = require("../schemas/task.schema");

module.exports = {
    saveTask:async(data,id)=>{
        const task = new Task (data);
        const result = await task.save();
        return result;
    },
    getAllTasks:async(query)=>{
        let filter = {};
        if (query) {
            filter = { title: { $regex: query, $options: "i" } };
        }
       const result = await Task.find(filter).sort("createdAt").populate("user");
        return result;
    }
}