'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a email' },
          notEmpty: { msg: 'email must not be empty' },
          isEmail: { msg: 'Must be a valid email address' }
        }
      },
      name: {
        type: Sequelize.STRING(50),
        validate: {
          notEmpty: { msg: 'name must not be empty' }
        }
      },
      password: {
        type: Sequelize.STRING(1024),
        validate: {
          notEmpty: { msg: 'password must not be empty' }
        }
      },
      phoneNumber: {
        type: Sequelize.STRING(50),
      },
      photo: {
        type: Sequelize.STRING(1024),
        defaultValue: "default-photo.png"
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("users");
  }
};