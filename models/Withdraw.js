const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

const Withdraw = sequelize.define("Withdraw", {
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
    amount: {
        type: Sequelize.DECIMAL(20),
        defaultValue: 0,
        validate: {
            notEmpty: { msg: "Amount must have value" }
        }
    },
    method: {
        type: Sequelize.STRING(50)
    },
    accountNumber: {
        type: Sequelize.STRING(50)
    },
    date: {
        type: Sequelize.DATEONLY
    }
});

// Define associations
Withdraw.associate = function (models) {
    Withdraw.belongsTo(models.Merchant, { foreignKey: 'MerchantID' });
}


module.exports = Withdraw;