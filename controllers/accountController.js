const User = require("../models/user");

// update user profile
exports.updateProfile = (req, res, next) => {

  const imageUrl = getImageUrl(req);
  const model = req.body;

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
      "lastName"
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

//  function getProfileById(id){

// }

function getImageUrl(req) {

  const url = req.protocol + '://' + req.get("host");
  const path = url + '/uploads/'+ req.file.filename;
 return path;
}
