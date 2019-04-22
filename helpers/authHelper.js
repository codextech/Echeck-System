
const User = require("../models/user");


// find user by Email

exports.getUserByEmail = async (email) => {

    var user;
    try {
        user = await User.findOne({
            where : {email: email},
          
        });
    } catch (error) {
        console.log(error);
        throw new Error(error);
        
    }
    return user;

}
