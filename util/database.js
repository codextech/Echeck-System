const Sequelize = require('sequelize');

const sequelize = new Sequelize('echequedb','root','tanzeel10', {
    dialect: 'mysql',
    host: 'localhost',
    define: {
        timestamps: false
    }
});

module.exports = sequelize;
