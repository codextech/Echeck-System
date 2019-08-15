const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
    return  res.status(401).json({error: err, message: "Auth fail"});
    } else {
     var decoded = jwt.verify(token,"DevSecretkey");
      next();
    }

    } catch(err){
       res.status(401).json({error: err, message: "Auth fail"});

    }
}
