const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Company = sequelize.define('company', {
  Id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  companyName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  EIN: {
    type: Sequelize.STRING,
    allowNull: false
  },
  hasPartner: Sequelize.BOOLEAN,
  companyDocument: Sequelize.STRING,
});

module.exports = Company;
