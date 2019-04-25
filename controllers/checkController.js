const crypto = require("crypto");
const Check = require("../models/check");
const CheckImage = require("../models/check-image");
const CheckBackground = require("../models/check-background");
const Token = require("../models/token");
const Signature = require("../models/user-signature");

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');


const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: ''

  }
}))

// enum
const { TokenType } = require('../helpers/token-type');

const CheckHelper = require("../helpers/checkHelper");

const authHelper = require("../helpers/authHelper");





exports.checkIssuedNumber = async (req, res, next) => {

  const userId = req.query.userId;
  var check;
  var checknmber;
  try {

    check = await Check.findOne({
      where: { senderId: userId },
      order: [['checkId', 'DESC']],

    });


    if (!check)
      checknmber = 001;  // assign check number if check is not present
    else
      checknmber = check.checkNumber + 1; //   assign the next number acc to previous



  } catch (error) {
    res.status(500).json({ message: error });
  }

  res.status(200).json({ data: checknmber });


}


exports.getCheckBackgrounds = async (req, res, next) => {

  const userId = req.query.userId;
  var backgroundImages;
  try {

    backgroundImages = await CheckBackground.findAll({
      where: { userId: userId }
    });


    if (!backgroundImages)
      res.status(200).json({ message: 'No background Used', data: {} });


  } catch (error) {
    res.status(500).json({ message: error });
  }

  res.status(200).json({ message: '', data: backgroundImages });

}


exports.saveCheck = async (req, res, next) => {

  var model = req.body;
  var savedCheck;
  var savedCheckBackground;
  var savedSecondPartnerSign;
  var checkBackgroundId;
  var biller;
  var recieverId;
  var foundReciever;
  var foundSenderPartner;
  var senderPartnerId;
  var senderPartnerSignatureId;
  var signatureCompleted = true; // assume that signature process is complete
  try {


    // save check Image in Db
    var checkFrontImage = getImageUrlFromArray(req, req.files['checkImage'][0]); // url of image
    var savedCheckImage = await CheckImage.create({
      checkFront: checkFrontImage,
    });

    if (model.senderOnBhalfSign != 'false' && model.senderOnBhalfSign != 'undefined') {
      var secondPartnerSign = getImageUrlFromArray(req, req.files['secondSignImage'][0]); // url of image
       savedSecondPartnerSign = await Signature.create({
        signatureImage: secondPartnerSign,
        userId: model.userId
      });
      senderPartnerSignatureId = secondPartnerSign.signatureId;
    }

    // save checkbacground Image into Db

    if (model.checkBackgroundId == 'null') {
      var checkBackgroundImage = getImageUrlFromArray(req, req.files['backgroundImage'][0]); // url of image
      savedCheckBackground = await CheckBackground.create({
        Image: checkBackgroundImage,
        uploadedByAdmin: false,
        userId: model.userId
      });
      checkBackgroundId = savedCheckBackground.checkBackgroundId;
    }
    else {
      checkBackgroundId = model.checkBackgroundId;
    }

    if (checkBackgroundId) {

      // second Sender Partner
      if (model.senderPartnerEmail) {
        signatureCompleted = false;  // we have to send email to sender Paertner
        foundSenderPartner = await authHelper.getUserByEmail(model.senderPartnerEmail);
      }

      /* ------------------ #### user search in Database #### ----------------------- */

      // Find Biller by BillerId
       biller = await CheckHelper.findBiller(model.billerId);  // biller is list of biller details that users add      

      // First Find the reciever in Database
      if (biller) {
      foundReciever = await authHelper.getUserByEmail(biller.recieverEmail);    // this will actual reciever    
      }

      if (foundReciever) {
        recieverId = foundReciever.Id; // biller email present as a user in Db 
      }

      if (foundSenderPartner) {
        senderPartnerId = foundSenderPartner.Id;
      }

      /* ------------------  ################################### --------------- */


      // save check to db
      savedCheck = await Check.create({
        checkNumber: model.checkNumber,
        issuedDate: model.issuedDate,
        isSignCompleted: signatureCompleted, // sender sign process
        amount: model.amount,
        checkMemo: model.checkMemo,
        individual: model.individual,
        senderAddress: model.senderAddress,
        senderName: model.senderName,
        billerId: model.billerId,  // its biller details for user
        bankAccountId: model.bankAccountId,
        companyId: model.companyId,
        senderId: model.userId,
        recieverId: recieverId,  // if receiver already present in Db
        isRecieved: false,  //  receiver notiifcation
        checkBackgroundId: checkBackgroundId,
        CheckImageId: savedCheckImage.checkImageId,
        senderPartnerId: senderPartnerId,
        senderPartnerSignId: senderPartnerSignatureId, // first save sign into signature table and get Id
      });

    }

/* ------------------  ##### ------------------------- ##### --------------- */

    // if reciever email not present in Db & isSignCompleted true then send token  

    if (!foundReciever && !model.senderPartnerEmail) {
      // generate Token against checkId

      var checkToken = await generateCryptoToken();

      // save token into db

      var createToken = await Token.create({
        token: checkToken,
        tokenType: TokenType.checkRecieve,
        userId: model.userId,
        checkId: savedCheck.checkId
      });


      // send email to Reciver For check

      var sendEmail = await transporter.sendMail({
        to: biller.recieverEmail,
        from: 'echeck@gmail.com',
        subject: 'Check Recieved',
        html: `<h1>Hi, you have recievd Check For ${model.recieverName} </h1>
 <a href="${apiUrl}/check/check-recieved?checkToken=${checkToken}">
   View Check
 </a> `
      });


    }

/* ------------------  ################################### --------------- */

/* ------------------  ##### sender Partner Email  ##### --------------- */

    if (model.senderPartnerEmail) {
      var senderPartnerToken = await generateCryptoToken();

      const tokenModel = {
        token: senderPartnerToken,
        tokenType: TokenType.sndPartnerSign,
        userId: model.userId,
        checkId: savedCheck.checkId,
      }

      var spCreatedToken = await CheckHelper.createToken(tokenModel);

      // send email to Reciver For check

      var sendEmail = await transporter.sendMail({
        to: model.senderPartnerEmail,
        from: 'echeck@gmail.com',
        subject: 'Signature Request',
        html: `<h1>Hi, Your Business Partner Need your Sign on Check For <br> ${model.recieverName} </h1>
  <a href="${apiUrl}/check/sign/sender-partner?checkToken=${spCreatedToken.token}">
    Click Here
  </a> `
      });

    }

/* ------------------  ################################### --------------- */


  } catch (error) {
    res.status(500).json({ message: error });
  }

  res.status(200).json({ data: savedCheck });


}


exports.saveCheckBack = async (req, res, next) => {

  var model = req.body;
  var savedCheck;
  var checkDetails;
  var recieverSignatureId;
 var foundRecieverPartner;
  var recieverPartnerId;
  recieverSignatureCompleted = true;  // assume reciever sign is completed

  try {

    var checkImage = await CheckImage.findOne({ where: { checkImageId: model.checkImageId } });

    if (!checkImage) {
      res.status(400).json({ message: 'Not Found', data: {} });
    }

    var checkBackImage = getImageUrlFromArray(req, req.files['checkBackImage'][0]); // url of image

    var savedCheckBackImage = await checkImage.update({
      checkBack: checkBackImage,
    });

    // save checkbacground Image into Db

    if (model.signatureId == 'undefined') {
      var userSignatureImage = getImageUrlFromArray(req, req.files['signImage'][0]); // url of image
      saveduserSignature = await Signature.create({
        signatureImage: userSignatureImage,
        userId: model.userId
      });
      recieverSignatureId = saveduserSignature.signatureId;
    }
    else {
      recieverSignatureId = model.signatureId;
    }


    // update Check
    if (recieverSignatureId) {

      if (model.recieverPartnerEmail !='') {
         recieverSignatureCompleted = false;  // we have to send email to sender Paertner
        foundRecieverPartner = await authHelper.getUserByEmail(model.recieverPartnerEmail);
        if (foundRecieverPartner) {
          recieverPartnerId = foundRecieverPartner.Id;
        }
      }

      checkDetails = await Check.findOne({ where: { checkId: model.checkId } })

      await checkDetails.update({
        recieverSignId: recieverSignatureId,
        recieverPartnerId: recieverPartnerId,
        isRecieverSignCompleted : recieverSignatureCompleted,
        isRecieved: true,
        recieveDate: Date.now()
      });
    }

    // if reciever not in Db then send mail
    if (!foundRecieverPartner) {

      // generate Token against checkId

      var checkToken = await generateCryptoToken();

      // save token into db

      const tokenModel = {
        token: checkToken,
        tokenType: TokenType.recPartnerSign,
        userId: model.userId,
        checkId: checkDetails.checkId
      }

      var rpCreatedToken = await CheckHelper.createToken(tokenModel);

      // send email to Reciver For check

      var sendEmail = await transporter.sendMail({
        to: model.recieverPartnerEmail,
        from: 'echeck@gmail.com',
        subject: 'Request For Signature',
        html: `<h1>Hi, Your Business partner recieve Check For ${checkDetails.recieverName} </h1>
                Please provide your sign in  the check
              <a href="${apiUrl}/check/sign/reciever-partner?checkToken=${rpCreatedToken.token}">
              View Check
            </a> `
      });
    }




  } catch (error) {
    res.status(500).json({ message: error });
  }

  res.status(200).json({ message: '', data: {} });


}


// Save Check with sender Partner sign

exports.saveCheckSenderPartnerSign = async (req, res, next) => {

  var model = req.body;
  var checkDetails;
  var spSignatureId;
  var foundReciever;
  var recieverId;
  try {

    var checkImage = await CheckImage.findOne({ where: { checkImageId: model.checkImageId } });

    if (!checkImage) {
      res.status(400).json({ message: 'Not Found', data: {} });
    }

    var checkAllSignImage = getImageUrlFromArray(req, req.files['checkImage'][0]); // url of image

    var savedCheckFrontImage = await checkImage.update({
      checkFront: checkAllSignImage,
    });

    // save checkbacground Image into Db

    if (model.signatureId == 'undefined') {
      var userSignatureImage = getImageUrlFromArray(req, req.files['signImage'][0]); // url of image
      saveduserSignature = await Signature.create({
        signatureImage: userSignatureImage,
        userId: model.userId
      });
      spSignatureId = saveduserSignature.signatureId;
    }
    else {
      spSignatureId = model.signatureId;
    }

     // find reciever in Db

     foundReciever = await authHelper.getUserByEmail(model.recieverEmail);
      if (foundReciever) {
        recieverId = foundReciever.Id;
      }
    // update Check
    if (spSignatureId) {

      checkDetails = await Check.findOne({ where: { checkId: model.checkId } })

     
      await checkDetails.update({
        senderPartnerSignId: spSignatureId,
        isSignCompleted: true,
        senderPartnerSignDate: Date.now(),
        recieverId : recieverId 
      });
    }

    if (!foundReciever) {

      // generate Token against checkId

      var checkToken = await generateCryptoToken();

      // save token into db

      const tokenModel = {
        token: checkToken,
        tokenType: TokenType.checkRecieve,
        userId: model.userId,
        checkId: checkDetails.checkId
      }

      var checkCreatedToken = await CheckHelper.createToken(tokenModel);



      // send email to Reciver For check

      var sendEmail = await transporter.sendMail({
        to: model.recieverEmail,
        from: 'echeck@gmail.com',
        subject: 'Check Recieved',
        html: `<h1>Hi, you have recievd Check For ${model.recieverName} </h1>
 <a href="${apiUrl}/check/check-recieved?checkToken=${checkCreatedToken}">
   View Check
 </a> `
      });
    }



  } catch (error) {
    res.status(500).json({ message: error });
  }

  res.status(200).json({ message: '', data: {} });


}


// Save Check with sender Partner sign

exports.saveCheckRecieverPartnerSign = async (req, res, next) => {

  var model = req.body;
  var checkDetails;
  var rpSignatureId;
  try {

    var checkImage = await CheckImage.findOne({ where: { checkImageId: model.checkImageId } });

    if (!checkImage) {
      res.status(400).json({ message: 'Not Found', data: {} });
    }

    // with Both Sign
    var checkBackImage = getImageUrlFromArray(req, req.files['checkBackImage'][0]); // url of image

    var savedCheckFrontImage = await checkImage.update({
      checkBack: checkBackImage,
    });

    // save checkbacground Image into Db

    if (model.signatureId == 'undefined') {
      var userSignatureImage = getImageUrlFromArray(req, req.files['signImage'][0]); // url of image
      saveduserSignature = await Signature.create({
        signatureImage: userSignatureImage,
        userId: model.userId
      });
      rpSignatureId = saveduserSignature.signatureId;
    }
    else {
      rpSignatureId = model.signatureId;
    }


    // update Check
    if (rpSignatureId) {

      checkDetails = await Check.findOne({ where: { checkId: model.checkId } })

      await checkDetails.update({
        recieverPartnerSignId: rpSignatureId,  
        isRecieverSignCompleted: true,
      });
    }


  } catch (error) {
    res.status(500).json({ message: error });
  }

  res.status(200).json({ message: '', data: {} });


}




// get Check By Token
exports.checkRecievedVerification = async (req, res, next) => {

  var checkToken = req.query.checkToken;
  var check;

  try {
    const token = await Token.findOne({ where: { token: checkToken } });

    // if token not found then
    if (!token) {
      return res.status(200).json({ message: 'Check Not Found' });
    }

    // if token  found then -> find check
    check = await Check.findOne({ where: { checkId: token.checkId } });


  } catch (error) {
    res.status(500).json({ message: error });
  }

  res.redirect(`http://localhost:4200/sign-up?checkToken=${checkToken}`);

  // res.status(200).json({message: 'You Recieved a Check', data: check});
}




//  reciever partner sign token verification

exports.checkRecieverPartnerVerify = async (req, res, next) => {

  var checkToken = req.query.checkToken;

  try {
    const token = await Token.findOne({ where: { token: checkToken } });

    // if token not found then
    if (!token) {
      return res.status(200).json({ message: 'Token Not Found' });
    }

  } catch (error) {
    res.status(500).json({ message: error });
  }
  res.redirect(`http://localhost:4200/sign-up?checkToken=${checkToken}`);

}

//  sender partner sign token verification

exports.checkSenderPartnerVerify = async (req, res, next) => {

  var checkToken = req.query.checkToken;

  try {
    const token = await Token.findOne({ where: { token: checkToken } });

    // if token not found then
    if (!token) {
      return res.status(200).json({ message: 'Token Not Found' });
    }

  } catch (error) {
    res.status(500).json({ message: error });
  }

  res.redirect(`http://localhost:4200/sign-up?checkToken=${checkToken}`);

}


exports.UnreadRecievedCheck = async (req, res, next) => {

  const userId = req.query.userId
  var check;
  try {

    check = await CheckHelper.unreadRecieveCheck(userId);

    if (!check) {
      return res.status(200).json({ message: 'No New Check', data: {} });
    }

  } catch (error) {
    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ message: 'Unread Checks', data: check });

}


exports.UnreadRecievedCheckById = async (req, res, next) => {

  const checkId = req.query.checkId
  var check;
  try {

    check = await CheckHelper.recieverCheck(checkId);

    if (!check) {
      return res.status(200).json({ message: 'No Check Found', data: {} });
    }

  } catch (error) {
    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ message: 'Check', data: check });

}


// ---------------- Sender Check Signatures Request ---------------------



exports.requestCheckSignaturesBySender = async (req, res, next) => {

  const userId = req.query.userId
  var check;
  try {

    check = await CheckHelper.requestCheckSignatures(userId);

    if (!check) {
      return res.status(200).json({ message: 'No New Check', data: {} });
    }

  } catch (error) {
    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ message: 'Checks Need your Signature', data: check });

}

exports.requestSenderCheckSignaturById = async (req, res, next) => {

  const checkId = req.query.checkId
  var check;
  try {

    check = await CheckHelper.requestCheckSignatureById(checkId);

    if (!check) {
      return res.status(200).json({ message: 'No Check Found', data: {} });
    }

  } catch (error) {
    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ message: 'Check', data: check });

}





// ---------------- Reciever Signatures Request ---------------------



exports.requestCheckSignaturesByReciever = async (req, res, next) => {

  const userId = req.query.userId
  var check;
  try {

    check = await CheckHelper.requestRecieverCheckSignatures(userId);

    if (!check) {
      return res.status(200).json({ message: 'No New Check', data: {} });
    }

  } catch (error) {
    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ message: 'Checks Need your Signatures', data: check });

}

exports.requestRecieverCheckSignaturById = async (req, res, next) => {

  const checkId = req.query.checkId
  var check;
  try {

    check = await CheckHelper.requestCheckSignatureById(checkId);

    if (!check) {
      return res.status(200).json({ message: 'No Check Found', data: {} });
    }

  } catch (error) {
    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ message: 'Check', data: check });

}


// ----------------- Check History ----------

exports.getAllSentChecks = async (req, res, next) => {


  const userId = req.query.userId
  var checks;
  try {

    checks = await CheckHelper.allSentChecks(userId);

    if (!checks) {
      return res.status(200).json({ message: 'No  Check', data: {} });
    }

  } catch (error) {
    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ message: 'checks', data: checks });

}


exports.getAllRecievedChecks = async (req, res, next) => {

  const userId = req.query.userId
  var checks;
  try {

    checks = await CheckHelper.allRecievedChecks(userId);

    if (!checks) {
      return res.status(200).json({ message: 'No Check', data: {} });
    }

  } catch (error) {
    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ message: 'all checks', data: checks });


}





// generate Token


async function generateCryptoToken() {
  const buffer = await new Promise((resolve, reject) => {
    crypto.randomBytes(256, function (ex, buffer) {
      if (ex) {
        reject("error generating token");
      }
      resolve(buffer);
    });
  });
  const token = crypto
    .createHash("sha1")
    .update(buffer)
    .digest("hex");

  console.log(token);
  return token;
}

// get Uploaded ImagesUrl

function getImageUrlFromArray(req, file) {

  const url = req.protocol + '://' + req.get("host");
  const path = url + '/uploads/' + file.filename;
  return path;
}