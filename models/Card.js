const Sequelize = require("sequelize");
const sequelize = require("../database/connection");
const User = require("./User");

// Define model
const Card = sequelize.define('Card', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    UserID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    name: {
        type: Sequelize.STRING(100),
        defaultValue: "Ilkomerz Card",
        validate: {
            notEmpty: { msg: "Card must have name" }
        }
    },
    saldo: {
        type: Sequelize.INTEGER(15),
        defaultValue: 0,
        validate: {
            notEmpty: { msg: "Saldo must have not empty" }
        }
    },
    pinNumber: {
        type: Sequelize.STRING(1024),
        defaultValue: "000000",
        validate: {
            notEmpty: { msg: 'pin number must not be empty' },
        }
    }
});

// Define associations
Card.associate = function (models) {
    Card.belongsTo(models.User, { foreignKey: 'UserID' });
    Card.hasOne(models.TopUpCashier, { foreignKey: 'CardID' });
    Card.hasMany(models.TopUpUser, { foreignKey: 'CardID' });
    Card.hasMany(models.Payment, { foreignKey: 'CardID' });
}

module.exports = Card;