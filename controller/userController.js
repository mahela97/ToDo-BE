const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const Joi = require("joi");
const {saveUser} = require("../services/userService")



module.exports={
    registerUser:async(req,res)=>{
        const schema = Joi.object({
            name:Joi.string().required(),
            email:Joi.string().email().required(),
            password:Joi.string().min(6).max(25).required()
        });
        const validation = schema.validate(req.body);
        if(validation.error){
            res.status(401).send(validation.error.message);
            return;
        }
        const data = validation.value;
        const salt = genSaltSync(10);
        data.password = hashSync(data.password, salt);
        try{
            const result = await saveUser(data);
            res.status(201).send({result});
        }
        catch(error){
            res.status(error.code||409).send(error.message);
        }

    }

}