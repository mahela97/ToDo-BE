const User = require('../schemas/user.schema');

modeule.exports={
    saveUser:async(data)=>{
            const user = new User(data);
            const isExist = await User.findOne({email:data.email});
            if (isExist){
                throw new Error("Email already exist").code(409);
            }
            const result = await user.save();
            return result;

    }
}