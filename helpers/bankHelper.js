

const BankAccountType = require("../models/bankaccount-type");
const BankAccount = require("../models/bank-account");
const Signature = require("../models/user-signature");


exports.bankAccountTypes = async () => {

    var accountTypes;
    try {

        // get types
        accountTypes = await BankAccountType.findAll();

    } catch (error) {
        console.log(error);
    }
    return accountTypes;

   
}



// bank account by  Id


exports.findBankAccount = async (id) => {

    var bankAccount;
    try {

        // get types
        bankAccount = await BankAccount.findOne({where: {bankAccountId: id}});

    } catch (error) {
        console.log(error);
    }
    return bankAccount;
   
}

// add bank acount sign

exports.addBankAccountSign = async (signId, accountId) => {

    var bankAccount;
    try {

        // get types
        bankAccount = await BankAccount.update({
            signatureId : signId
        },{where: { bankAccountId: accountId }});

    } catch (error) {
        console.log(error);
    }
    return bankAccount;
   
}


exports.addSignatureImage = async (req,model) => {

    var signature;
    try {

        var signImageUrl =  getImageUrl(req);
         signature = await Signature.create({
          signatureImage : signImageUrl,
          userId : model.userId
        });
        

    } catch (error) {
        console.log(error);
    }
    return signature;
   
}






// get image url after upload in folder

function getImageUrl(req) {

    const url = req.protocol + '://' + req.get("host");
    const path = url + '/uploads/'+ req.file.filename;
   return path;
  }