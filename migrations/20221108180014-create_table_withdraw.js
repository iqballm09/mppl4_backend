'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("withdraws", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
      date: {
        type: Sequelize.DATEONLY
      },
      accountNumber: {
        type: Sequelize.STRING(50)
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("withdraws");
  }
};
