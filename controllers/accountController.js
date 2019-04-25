const User = require("../models/user");
const accountHelper = require("../helpers/accountHelper");

// update user profile
exports.updateProfile = (req, res, next) => {

  var imageUrl;
  const model = req.body;

  if (req.file) {
    imageUrl = getImageUrl(req);
  }

  User.update (
    {
      email: model.email,
      firstName: model.firstName,
      lastName: model.lastName,
      profileImageUrl: imageUrl
    },
    { where: { Id: model.Id }}
    ).then(result => {
      res.status(200).json({ message: "Profile Updated", data:result });
    })
    .catch(err => {
      res.status(500).json({ message: "Updation Failed", error: err });
    });
};

// get user Profile
exports.getProfile = (req, res, next) => {
  console.log("************" + req.query.Id);
  const id = req.query.Id;

  User.findOne({
    where: { Id: id },
    attributes: [
      "Id",
      "email",
      "uniqueName",
      "profileImageUrl",
      "firstName",
      "lastName",
      "kycStatus"
    ]
  })
    .then(profile => {
      res.status(200).json({
        profile: profile
      });
    })
    .catch(err => {
      res.status(400).json({ message: err });
    });
};



// add user KYC

exports.kycIdVerification = async (req, res, next) => {

  var imageUrl;
  const model = req.body;
  var document;
  try {

    if (req.file) {
      imageUrl = getImageUrl(req);
    }

    // addKYCDocumnet
    document =  await accountHelper.userIdVerification(model.userId, imageUrl)
    if (!document) {
      res.status(400).json({ message: "Could not Upload", data:{} });      
    }
    
  } catch (error) {
    res.status(500).json({error:error });          
  }
  res.status(200).json({ message: "Uploaded", data:document });      
 
}




function getImageUrl(req) {

  const url = req.protocol + '://' + req.get("host");
  const path = url + '/uploads/'+ req.file.filename;
 return path;
}
