const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.logIn = (req, res, next) => {
  console.log("logged in reach***********");
  let foundUser;
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      // check email exist
      if (!user) {
        return res.status(400).json({
          message: "Email not Found"
        });
      }
      foundUser = user;
      // user password match ,return promis,
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(400).json({
          message: "Wrong Password"
        });
      }
      // generatomg Token
      const token = generateToken(foundUser);

      res.status(200).json({
        token: token
      });
    })
    .catch(err => {
      console.log(err);

      return res.status(400).json({
        message: "Log in Failed"
      });
    });
};

exports.signUp = async (req, res, next) => {

  var user;
  var createdUser;
  var token;
  try {
    // check for email 
    user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      return res.status(400).json({
        message: "Email already in use!"
      });
    }
    // check for unique name
    var nameId = await User.findOne({where: { uniqueName: req.body.uniqueName }});
    if (nameId) {
      return res.status(400).json({
        message: "Name Already Taken!"
      });
    }

    // if checks pass

    var hash = await bcrypt.hash(req.body.password, 10);

    // Create User
    createdUser = await User.create({
      email: req.body.email,
      uniqueName: req.body.uniqueName,
      password: hash
    });

    // generate Token

    token = generateToken(createdUser);

  } catch (error) {
    res.status(500).json({error: error,message: "Registeration Failed"});
  }
  res.status(201).json({message: "Registered",token: token});
}


exports.getAllUsers = async (req, res, next) => {

  var users;
  try {
    users = await User.findAll({
      attributes: [
      "Id",
      "email",
      "uniqueName"]});
  } 
  catch (error) {
    return res.status(500).json({message: "something wrong", error: err});
  }
  res.status(200).json({message: "users", data: users})
}
   


function generateToken(foundUser) {
  const token = jwt.sign(
    {
      email: foundUser.email,
      uniqueName: foundUser.uniqueName,
      Id: foundUser.Id
    },
    "DevSecretkey",
    { expiresIn: "24h" }
  );
  return token;
}
