const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var path = require('path');
const http = require('http');
const bcrypt = require("bcryptjs");


var env = process.env.NODE_ENV || 'dev';

// start server in production
/* if (env == 'production') {
http.createServer(app);
app.listen();
} */

// start server in dev mode
const port = process.env.PORT || 30800;
http.createServer(app);
app.listen(port, () => {
  console.log(`Server Running in ${port}`);
});


// end
console.log(env);
if (env == 'production') {
/* global.apiUrl = "https://www.pay2mate.com/api";
global.APPURL = "https://www.pay2mate.com/"; */

global.apiUrl = "https://pay2mate.herokuapp.com/api";
global.APPURL = "https://pay2mate.herokuapp.com/";

}
if (env == 'dev') {
global.apiUrl = "http://localhost:3000/api";
global.APPURL = "http://localhost:3000/";
}

global.ROOT = __dirname;


// // view engine setup
// app.set('view engine', 'ejs');




//--------------our db instance------------------

const sequelize = require("./util/database");
const sequelizeRealtions = require("./util/table-relations");
const User = require('./models/user');
// ------------------------------------------------
// ______our routes________
const apiRoutes = require("./routes/api");
//___________________________

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// cors origin solved
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With, cache-control"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS,PUT"
  );
  next();
})

app.use('/uploads',express.static(path.join(__dirname, './uploads')));
// access frontend folder
app.use('/',express.static(path.join(__dirname, '/angular')));

app.use('/api', apiRoutes);

// access angular page according to routes
app.use((req,res) => {
  res.sendFile(path.join(__dirname,"angular", "index.html"));
})




// add tables realtion
sequelizeRealtions.allTableRealtions();

sequelize
  //  .sync()
  .sync({force: true})
  .then(result => {
  console.log('table created');
sequelizeRealtions.seedDatabase();
    return bcrypt.hash('admin123',10)
  .then(hash => {
        User.create({
        uniqueName: 'admin',
        email: 'admin@pay2mate.com',
        password: hash,
        isVerified: true, // email
        isAdmin: true,
        trustedUser:true // kyc
     });
  })
}).catch(err => {
    console.log("error occured in db" + err);
  });

module.exports = app;
