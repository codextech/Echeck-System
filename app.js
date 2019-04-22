const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var path = require('path'); 

//--------------our db instance------------------

const sequelize = require("./util/database"); 
const User = require("./models/user");
const Reciever = require("./models/reciever");
const Company = require("./models/company"); 
const Signature = require("./models/user-signature");
const Bank = require("./models/bank");
const BankAccount = require("./models/bank-account");
const Token = require("./models/token");
const Check = require("./models/check");
const CheckImage = require("./models/check-image");
const CheckBackground = require("./models/check-background");

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


app.use('/api', apiRoutes);




// -------User & Token
User.hasOne(Token,{foreignKey: 'userId'});
Token.belongsTo(User, {foreignKey: "userId"});
// -----------------------------


// -------User & Reciever
User.hasMany(Reciever, {foreignKey : 'userId'});
Reciever.belongsTo(User, {foreignKey : 'userId'});
// -----------------


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
 
//------------- bank_account -> check

BankAccount.hasMany(Check,{foreignKey : 'bankAccountId'});
Check.belongsTo(BankAccount,{foreignKey : 'bankAccountId'});

//------------------------------

//------------- Company -> check
Company.hasMany(Check,{foreignKey : 'companyId'});
//------------------------------

//------------- Reciever -> check
Reciever.hasMany(Check,{foreignKey : 'billerId'});
Check.belongsTo(Reciever,{foreignKey : 'billerId'});
//------------------------------


//------------- user-> check

User.hasMany(Check,{foreignKey : 'senderId'});
User.hasMany(Check,{foreignKey : 'senderPartnerId'});
User.hasMany(Check,{foreignKey : 'recieverId'});
User.hasMany(Check,{foreignKey : 'recieverPartnerId'});
// Check.belongsTo(User,{foreignKey : 'senderId'});

//------------------------------

//------------- signature -> check

Signature.hasMany(Check,{foreignKey : 'senderPartnerSignId'});
Signature.hasMany(Check,{foreignKey : 'recieverSignId'});
Signature.hasMany(Check,{foreignKey : 'recieverPartnerSignId'});

//------------------------------

//------------- Token -> check
Check.hasOne(Token,{foreignKey: 'checkId'});
//---------------------------------

//------------- CheckBackground -> check
CheckBackground.hasMany(Check,{foreignKey: 'checkBackgroundId'});
Check.belongsTo(CheckBackground,{foreignKey: 'checkBackgroundId'});
//---------------------------------

//------------- CheckImage -> check // check Front and back image
CheckImage.hasOne(Check,{foreignKey: 'CheckImageId'});
Check.belongsTo(CheckImage,{foreignKey: 'CheckImageId'});
//---------------------------------

//------------- User -> CheckBackground
User.hasMany(CheckBackground,{foreignKey: 'userId'});
//---------------------------------


sequelize
  //  .sync() 
 .sync({force: true}) 
  .then(result => {
    // console.log(result);
    console.log('table created');
    
  })
  .catch(err => {
    console.log("error occured in db" + err); 
  });

module.exports = app;
