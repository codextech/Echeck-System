const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');


const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key : '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'

  }
}));

module.exports = transporter;
