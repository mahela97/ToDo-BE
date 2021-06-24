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

    },
    loginUser:async(req,res)=>{
        const body = req.body;
        let userDetailsinDatabase;
        try {
            userDetailsinDatabase = await getRegistedUserByEmail(body.email);
            if (userDetailsinDatabase && !userDetailsinDatabase.isDelete) {
                const result = compareSync(
                    body.password,
                    userDetailsinDatabase.password
                );
                if (result) {
                    userDetailsinDatabase.password = undefined;
                    userDetailsinDatabase.user_photo = undefined;
                    userDetailsinDatabase.userType= "User"
                    const jsontoken = sign({ result: userDetailsinDatabase }, "qwe1234", {
                        expiresIn: "1day",
                    });
                    return res.json({
                        sucess: 1,
                        message: "login Sucess",
                        token: jsontoken,
                    });
                } else {
                    return res.json({
                        sucess: 0,
                        message: "Password is invalid",
                    });
                }
            } else {
                return res.json({
                    sucess: 0,
                    message: "Invalid Email",
                });
            }
        } catch (err) {
            return res.json({
                sucess: 0,
                message: err,
            });
        }
    }

}