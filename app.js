const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var path = require('path');
const http = require('http');
const bcrypt = require("bcryptjs");



// start server


const port = process.env.PORT || 3080;
http.createServer(app);

app.listen(port, () => {
  console.log(`Server Running in ${port}`);

});



var env = process.env.NODE_ENV || 'dev';
console.log(env);
if (env == 'production') {
global.apiUrl = "https://www.rxcoin.net/api";
global.APPURL = "https://www.rxcoin.net/";
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
app.use('/',express.static(path.join(__dirname, './angular')));

app.use('/api', apiRoutes);

// access angular page according to routes
app.use((req,res) => {
  res.sendFile(path.join(__dirname,"angular", "index.html"));
})




// add tables realtion
sequelizeRealtions.allTableRealtions();


sequelize
   .sync()
//  .sync({force: true})
  .then(result => {
//   console.log('table created');
//     return bcrypt.hash('admin123',10)
//   .then(hash => {
//         User.create({
//         uniqueName: 'admin',
//         email: 'admin@rxcoin.net',
//         password: hash,
//         isVerified: true,
//         isAdmin: true,
//             trustedUser:true
//      });
//   })
}).catch(err => {
    console.log("error occured in db" + err);
  });

module.exports = app;
