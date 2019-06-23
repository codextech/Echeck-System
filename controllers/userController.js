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
