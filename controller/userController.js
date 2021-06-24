const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const Joi = require("joi");
const {saveUser,getUserByEmail} = require("../services/userService")



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

    },
    loginUser:async(req,res)=>{
        const schema = Joi.object({
            email:Joi.string().email().required(),
            password:Joi.string().min(6).max(25).required()
        });
        const validation = schema.validate(req.body);
        if(validation.error){
            res.status(401).send(validation.error.message);
            return;
        }
        const body = validation.value;
        try {
            const user = await getUserByEmail(body.email);
            if (user) {
                const result = compareSync(
                    body.password,
                    user.password
                );
                if (result) {
                    const jsontoken = sign({ result: user }, "secret", {
                        expiresIn: "1day",
                    });
                    return res.json({
                        sucess: 1,
                        message: "login Sucess",
                        token: jsontoken,
                        user:user
                    });
                } else {
                    return res.json({
                        message: "Password is invalid",
                    });
                }
            } else {
                return res.json({
                    message: "Invalid Email",
                });
            }
        } catch (error) {
            res.status(error.code).send(error.message);
        }
    }

}