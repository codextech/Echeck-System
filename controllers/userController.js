const userHelper = require("../helpers/userHelper");



exports.getUsers = async (req, res, next) => {

 var users;

  try {
    users = await userHelper.allUsers();

    if (!users) {
      res.status(400).json({message: 'Users', data: {}});
    }

  } catch (error) {
    res.status(500).json({message: error, data: {}});
  }

  res.status(200).json({message: 'Users', data: users});


};



// delete User

exports.deleteUser = async (req, res, next) => {

  var isSucceed;

   try {
     isSucceed = await userHelper.deleteUser();

     if (isSucceed != true) {
       res.status(400).json({message: 'Could Not Delete User', data: {}});
     }

   } catch (error) {
     res.status(500).json({message: error, data: {}});
   }
   res.status(200).json({message: 'User Deleted Succefully', data: users});
 };


// suspend User

exports.suspendUser = async (req, res, next) => {

  var isSucceed;

   try {
    isSucceed = await userHelper.suspendUser();

     if (isSucceed != true) {
       res.status(400).json({message: 'User Could Not Suspend', data: {}});
     }

   } catch (error) {
     res.status(500).json({message: error, data: {}});
   }

   res.status(200).json({message: 'User Suspended Succefully', data: users});


 };
