const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define('user', {
  Id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  uniqueName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  registerTime: Sequelize.DATE,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  profileImageUrl: Sequelize.STRING,
  documentImageurl: Sequelize.STRING,
  resetToken: Sequelize.STRING,
  resetTokenExpire : Sequelize.STRING,
  isVerified: Sequelize.BOOLEAN,
  rejectReason: Sequelize.STRING
});

module.exports = User;
