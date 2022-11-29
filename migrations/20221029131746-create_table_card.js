'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("cards", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(100),
        defaultValue: "Ilkomerz Card",
        validate: {
          notEmpty: { msg: "Card must have name" },
          notNull: { msg: "Card name must not null" }
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
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("cards");
  }
};