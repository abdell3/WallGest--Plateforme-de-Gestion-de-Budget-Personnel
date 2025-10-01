'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: { 
        allowNull: false, 
        autoIncrement: true, 
        primaryKey: true, 
        type: Sequelize.INTEGER 
      },
      reference: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      deposit: { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
        defaultValue: 0 
      },
      withdraw: { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
        defaultValue: 0 
      },
      walletId: { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
        references: { 
        model: 'Wallets', 
        key: 'id' 
      }, 
      onUpdate: 'CASCADE', 
      onDelete: 'CASCADE' 
    },
      createdAt: { 
        allowNull: false, 
        type: Sequelize.DATE, 
        defaultValue: Sequelize.fn('NOW') 
      },
      updatedAt: { 
        allowNull: false, 
        type: Sequelize.DATE, 
        defaultValue: Sequelize.fn('NOW') 
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Transactions');
  }
};