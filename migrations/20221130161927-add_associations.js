'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'cards', // name of Source model
      'UserID', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
      .then(() => {
        // Card hasMany Top Up
        return queryInterface.addColumn(
          'topup_users', // name of Target model
          'CardID', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'cards', // name of Source model
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      })
      .then(() => {
        // Card hasMany Top Up
        return queryInterface.addColumn(
          'topup_cashiers', // name of Target model
          'CardID', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'cards', // name of Source model
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      })
      .then(() => {
        // Card hasMany Top Up
        return queryInterface.addColumn(
          'topup_cashiers', // name of Target model
          'MerchantID', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'merchants', // name of Source model
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      })
      .then(() => {
        // Card hasMany Payment
        return queryInterface.addColumn(
          'payments', // name of Target model
          'CardID', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'cards', // name of Source model
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      })
      .then(() => {
        // Card hasMany Payment
        return queryInterface.addColumn(
          'payments', // name of Target model
          'MerchantID', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'merchants', // name of Source model
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      })
      .then(() => {
        // Card hasMany Top Up
        return queryInterface.addColumn(
          'withdraws', // name of Target model
          'MerchantID', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'merchants', // name of Source model
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'cards', // name of Source model
      'UserID' // key we want to remove
    )
      .then(() => {
        return queryInterface.removeColumn(
          'topup_users', // name of the Target model
          'CardID' // key we want to remove
        );
      })
      .then(() => {
        return queryInterface.removeColumn(
          'topup_cashiers', // name of the Target model
          'CardID' // key we want to remove
        );
      })
      .then(() => {
        return queryInterface.removeColumn(
          'topup_cashiers', // name of the Target model
          'MerchantID' // key we want to remove
        );
      })
      .then(() => {
        return queryInterface.removeColumn(
          'payments', // name of the Target model
          'CardID' // key we want to remove
        );
      })
      .then(() => {
        return queryInterface.removeColumn(
          'payments', // name of the Target model
          'MerchantID' // key we want to remove
        );
      })
      .then(() => {
        return queryInterface.removeColumn(
          'withdraws', // name of the Target model
          'MerchantID' // key we want to remove
        );
      })
  }
};