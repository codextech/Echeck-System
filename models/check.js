const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Check = sequelize.define('check', {
  checkId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  checkNumber: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  issuedDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  amount: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  checkMemo: Sequelize.STRING,
  recieverName: Sequelize.STRING,
  individual: Sequelize.BOOLEAN,
  senderName: Sequelize.STRING,
  senderAddress: Sequelize.STRING,
  isSignCompleted: Sequelize.BOOLEAN,
  isRecieverSignCompleted: Sequelize.BOOLEAN,
  senderPartnerSignDate: Sequelize.DATE,
  recieverPhone:Sequelize.STRING,
  recieverEmail: Sequelize.STRING,
  isRecieved: Sequelize.BOOLEAN,
  recieveDate: Sequelize.DATE,


});

module.exports = Check;
