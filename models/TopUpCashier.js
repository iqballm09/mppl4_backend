const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

const TopUpCashier = sequelize.define("TopUp_Cashier", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    MerchantID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'merchants',
            key: 'id'
        }
    },
    CardID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'cards',
            key: 'id'
        }
    },
    amount: {
        type: Sequelize.DECIMAL(20),
        defaultValue: 0,
        validate: {
            notEmpty: { msg: "Amount must have value" }
        }
    },
    date: {
        type: Sequelize.DATEONLY
    }
});

// Define associations
TopUpCashier.associate = function (models) {
    TopUpCashier.belongsTo(models.Card, { foreignKey: 'CardID' });
    TopUpCashier.belongsTo(models.Merchant, { foreignKey: 'MerchantID' });
}

module.exports = TopUpCashier;