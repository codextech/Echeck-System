
const User = require("../models/user");
const KYC = require("../models/kyc");




exports.userIdVerification = async (userId, imageUrl) => {

    var document;
    var user
    try {

        document = await   KYC.create({
            document: imageUrl,
            documentType: 'id verification',
            userId: userId
        });

        // find user with user and update Kyc Status -> false // admin will approve this
        user = await User.findOne({where: {Id: userId}});
        await user.update({
            kycStatus: false
        });

       
    } catch (error) {
        console.log(error);
        throw new Error(error);       
    }
    return document;

}
