'use strict';
module.exports = {

  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Wallets', {
      id: { 
        allowNull: false, 
        autoIncrement: true, 
        primaryKey: true, 
        type: Sequelize.INTEGER },
      amountG: { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
        defaultValue: 0 
      },
      totalDepo: { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
        defaultValue: 0 
      },
      totalWithdraw: { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
        defaultValue: 0 
      },
      userId: { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
        references: { 
        model: 'Users', 
        key: 'id' 
      }, 
      onUpdate: 'CASCADE', 
      onDelete: 'CASCADE' 
    },
      categoryId: { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
        references: { 
        model: 'Categories', 
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
    await queryInterface.dropTable('Wallets');
  }
};