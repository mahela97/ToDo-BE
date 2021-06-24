const Joi = require("joi");
const {saveTask} = require("../services/taskService")

module.exports ={
    craeteTask:async(req,res)=>{
        const schema = Joi.object({
            title:Joi.string().required().max(20).min(2),
            description:Joi.string().required(),
        });
        const validation = schema.validate(req.body);
        if(validation.error){
            res.status(401).send(validation.error.message);
            return;
        }
        const data = validation.value;
        data.user = req.user._id;
        try{
            const task = await saveTask(data);
            res.status(201).send({message:"Success"});
        }catch(error){
            res.status(error.code).send(error.message);
        }

    }
}