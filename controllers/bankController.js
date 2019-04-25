const User = require("../models/user");
const Bank = require("../models/bank");
const BankAccount = require("../models/bank-account");
const Company = require("../models/company");
const Signature = require("../models/user-signature");
const BankAccountType = require("../models/bankaccount-type");

//helper
const bankHelper = require("../helpers/bankHelper");



exports.getBank = async (req, res, next) => {
  const rnId = req.query.rn;
  var bank;
  try {
    bank = await Bank.findOne({where: {routingNumber: rnId}});
  
    if (bank) {
      return res.status(200).json({ message: "bank found", data: bank });
    }
    
  } catch (error) {
    res.status(500).json({ message: error });
  }

  return res.status(202).json({ message: "Go for Live Api", status:202});  
};


exports.creatBank = async (req, res, next) => {
  const model = req.body;
  var bank;
  try {
    bank = await Bank.findOne({where: {routingNumber: model.routingNumber}});
  
    if (bank) {
      return res.status(200).json({ message: "bank already Present", data: bank });
    }
  
    bank = await Bank.create(
        {
          bankName: model.bankName,
          routingNumber: model.routingNumber,
          city: model.city,
          address: model.address,
          telephone: model.telephone,
        });
    
  } catch (error) {
    res.status(500).json({ message: error });
  }

  res.status(201).json({ message: "Bank Succefully Added", data: bank });  
};


exports.getAllBanks = async (req, res, next) => {
  var bank;
  try {
    bank = await Bank.findAll({
      attributes: ['bankId', 'bankName','routingNumber']
    });
    
  } catch (error) {
    res.status(500).json({ message: error });
  }

   res.status(200).json({ message: "all banks",  data: bank});  
};

//-------------------------Bank Account-------------------------

// creat bank account
exports.creatBankAccount = async (req, res, next) => {
  const model = req.body;
  var bankAccount;
  // var signId;
  try {
    bankAccount = await BankAccount.findOne({where: {accountNumber: model.accountNumber, bankId: model.bankId}});
  
    if (bankAccount) {
      return res.status(400).json({ message: "Bank Account is already added" });
    }

    // // avalibale for other company or not --- search by bank routing and account number
    // var isAccountAvailable = await BankAccount.findOne({where: {bankId: model.bankId, accountNumber: model.accountNumber}});

    // if (isAccountAvailable) {
    //   return res.status(400).json({ message: "Bank Account is already in use of other company" });
    // }

    // add signature to signature table for maintaing history
    // if (model.signatureId) {
    //   var signImageUrl =  getImageUrl(req);
    //   var signature = await Signature.create({
    //     signatureImage : signImageUrl,
    //     userId : model.userId
    //   }); 
    //   signId = signature.signatureId; // new sign
    // }
    //   else{
    //     signId = model.signatureId; // user choosed existing sign
    //   }
   
  
    bankAccount = await BankAccount.create(
        {
          accountTypeId: model.bankaccountTypeId,
          accountName: model.accountName,
          accountNumber: model.accountNumber,
          isSubAccount: model.isSubAccount,
          subAccountNumber: model.subAccountNumber,
          userId: model.userId,
          // companyId: model.Id,
          bankId: model.bankId,
        });
    
  } catch (error) {
    res.status(500).json({ message: error });
  }

  res.status(201).json({ message: "Account Succefully Added" });  
};



exports.getBankAccount = async (req, res, next) => {
  const id = req.query.userId;
  var bankAccounts;
  try {
    bankAccounts = await BankAccount.findAll({where: {userId: id},

      include: [
        { model: Bank },
        { model: BankAccountType }
    ]
    });
  
    if (!bankAccounts) {
      return res.status(400).json({ message: "Accounts not found" });
    }
  
  res.status(201).json({ message: "Succefull", data: bankAccounts });  
    
  } catch (error) {
    res.status(500).json({ message: error });
  }

};


// single bank account



exports.getBankAccountById = async (req, res, next) => {
  const id = req.query.bankAccountId;
  var bankAccount;
  try {
    bankAccount = await BankAccount.findOne({where: {bankAccountId: id}});
  
    if (!bankAccount) {
      return res.status(400).json({ message: "Accounts not found" });
    }
  
  res.status(201).json({ message: "Succefull", data: bankAccount });  
    
  } catch (error) {
    res.status(500).json({ message: error });
  }

};

//update

exports.updateBankAccount = async (req,res,next) => {
  const model = req.body;
  var bankAccount;
  var signId;
try {

 

  // bankAccount = await BankAccount.findOne({where: {companyId: model.companyId, bankId: model.bankId}});
  
  // if (bankAccount) {
  //   return res.status(400).json({ message: "Bank is already attached to company" });
  // }

  // avalibale for other company or not --- search by bank routing and account number
  var isAccountAvailable = await BankAccount.findOne({where: {bankId: model.bankId, accountNumber: model.accountNumber}});

  if (isAccountAvailable) {
    return res.status(400).json({ message: "Bank Account is already added" });
  }
  
    // add signature to signature table for maintaing history
    if (!model.signatureId) {
      var signImageUrl =  getImageUrl(req);
      var signature = await Signature.create({
        signatureImage : signImageUrl,
        userId : model.userId
      });
      signId = signature.signatureId; // new sign
    }
      else{
        signId = model.signatureId; // user choosed existing sign
      }
   
  
      bankAccount = await BankAccount.update(
        {
          accountTypeId: model.bankaccountTypeId,
          accountName: model.accountName,
          accountNumber: model.accountNumber,
          isSubAccount: model.isSubAccount,
          subAccountNumber: model.subAccountNumber,
          userId: model.userId,
          bankId: model.bankId,
          signatureId : signId
        },{where: { bankAccountId: model.bankAccountId }});
  
} catch (error) {
  res.status(500).json({message: error})
}

res.status(201).json({message: 'Succefully Updated', data: bankAccount})        

}




// Delete bank Account @params bankaccountId


exports.deleteBankAccount = async (req, res, next) => {
  const accountId = req.query.bankAccountId;
  try {
    await BankAccount.destroy({
      where : {bankAccountId: accountId}
    });
    
  } catch (error) {
    res.status(500).json({ message: error });
  }
  res.status(200).json({ message: "Succefully Deleted",  data: null});  

};



// ---------------------Bank Account Types History-----------------


exports.getBankAccountTypes = async (req, res, next) => {
  var accountTypes;
  try {
    accountTypes = await bankHelper.bankAccountTypes();
    
  } catch (error) {
    res.status(500).json({ message: error });
  }

   res.status(200).json({ message: "",  data: accountTypes});  
};

// ---------------------user Signature History-----------------

exports.getSignatures = async (req, res, next) => {
  const userId = req.query.userId
  var signatures;
  try {
    signatures = await Signature.findAll({
      attributes: ['signatureId', 'signatureImage'],
      where: {userId: userId}
    });
    
  } catch (error) {
    res.status(500).json({ message: error });
  }

   res.status(200).json({ message: "all signatures",  data: signatures});  
};


// Add bank Account Signatures

exports.addSignature = async (req, res, next) => {
  const model = req.body;
  var signId;
  var bankAccount;
  try {

      // add signature to signature table for maintaing history
      if (model.signatureId != 'null') {
        signId = model.signatureId; // user choosed existing sign
      }
      else{
        var signature = await bankHelper.addSignatureImage(req,model);
        signId = signature.signatureId; // new sign
        }

        bankAccount =  await bankHelper.addBankAccountSign(signId,model.bankAccountId);

        if (!bankAccount) {
          return res.status(400).json({ message: "Bank Account not Updated" });
        }

        // update Bank Account Sign

    
    
  } catch (error) {
    res.status(500).json({ message: error });
  }

   res.status(200).json({ message: "Signature Added",  data: {}});  
};

function getImageUrl(req) {

  const url = req.protocol + '://' + req.get("host");
  const path = url + '/uploads/'+ req.file.filename;
 return path;
}