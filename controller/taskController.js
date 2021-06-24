const Joi = require("joi");
const {saveTask,getAllTasks} = require("../services/taskService")

module.exports ={
    createTask:async(req,res)=>{
        const schema = Joi.object({
            title:Joi.string().required().max(20).min(2),
            description:Joi.string().required(),
        });
        const validation = schema.validate(req.body);
        if(validation.error){
            res.status(401).send({message:validation.error.message});
            return;
        }
        const data = validation.value;
        data.user = req.user._id;
        try{
            await saveTask(data);
            res.status(201).send({message:"Success"});
        }catch(error){
            console.log(error);
            res.status(error.code||404).send({message:error.message});
        }

    },
    getAllTasks:async(req,res)=>{
        try{
            const query = req.query.title;
            const tasks = await getAllTasks(query);
            const updatedTasks = tasks.map((task)=>{
                task.user.password = undefined;
                return task;
            });
            res.status(201).send(updatedTasks);
        }catch(error){
            res.status(error.code).send(error.message);
        }
    }
}