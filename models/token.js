const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Token = sequelize.define('token', {
    tokenId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  token: Sequelize.STRING

});

module.exports = Token;
