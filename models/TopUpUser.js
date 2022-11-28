const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

const TopUpUser = sequelize.define("TopUp_User", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    method: {
        type: Sequelize.STRING(50)
    },
    detailMethod: {
        type: Sequelize.STRING(1024)
    },
    date: {
        type: Sequelize.DATEONLY
    }
});

// Define associations
TopUpUser.associate = function (models) {
    TopUpUser.belongsTo(models.Card, { foreignKey: 'CardID' });
}

module.exports = TopUpUser;