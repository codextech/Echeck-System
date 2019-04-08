const express = require("express");
const bodyParser = require("body-parser");
var multer = require('multer');
const app = express();
var path = require('path'); 

//--------------our db instance------------------

const sequelize = require("./util/database"); 
const User = require("./models/user");
const Company = require("./models/company"); 
const Signature = require("./models/user-signature");
const Bank = require("./models/bank");
const BankAccount = require("./models/bank-account");
// ------------------------------------------------



// ______our routes________
const apiRoutes = require("./routes/api");
//___________________________

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 

app.use('/uploads',express.static(path.join(__dirname, './uploads')));
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

app.use('/api', apiRoutes);




// -------User & Company
Company.belongsToMany(User, {through:'UserCompany', foreignKey : 'companyId'} ) // Many to Many RelationShip
User.belongsToMany(Company, {through:'UserCompany',foreignKey : 'userId'}) // Many to Many RelationShip
// -----------------

// ------User and Signature----- Relation define as (1 to many then many 1 to 1...)
User.hasMany(Signature,{foreignKey : 'userId', onDelete: 'cascade'} ); // Will add userId to signature model
Signature.belongsTo(User); // Will also add userId to signature model
//-----------------------------

// ------- User -> Bank_Accounts
User.hasMany(BankAccount,{foreignKey : 'userId', onDelete: 'cascade'});
BankAccount.belongsTo(User,{foreignKey : 'userId'});
// ----------------------------



// ------- Bank & Bank_Accounts
Bank.hasMany(BankAccount, {foreignKey : 'bankId', onDelete: 'cascade'}); // Will add userId to Task model 
BankAccount.belongsTo(Bank,{foreignKey : 'bankId'});
// ----------------------


// ------- Bank_Accounts -> Signatures
Signature.hasMany(BankAccount,{foreignKey : 'signatureId'});
BankAccount.belongsTo(Signature,{foreignKey : 'signatureId'});
// ----------------------------

// ------- Bank_Accounts -> Company
Company.hasMany(BankAccount,{foreignKey : 'companyId'});
BankAccount.belongsTo(Company,{foreignKey : 'companyId'});
// ----------------------------
 
sequelize
   .sync() 
//  .sync({force: true}) 
  .then(result => {
    // console.log(result);
    console.log('table created');
    
  })
  .catch(err => {
    console.log("error occured in db" + err); 
  });

module.exports = app;
