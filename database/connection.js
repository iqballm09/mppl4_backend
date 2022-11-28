const Sequelize = require("sequelize");

const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'sqlite',
    storage: "foodpay.db"
});

module.exports = sequelize;