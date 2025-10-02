'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CategoryRequests', {
      id: { 
        allowNull: false, 
        autoIncrement: true, 
        primaryKey: true, 
        type: Sequelize.INTEGER 
      },
      title: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      reason: { 
        type: Sequelize.TEXT, 
        allowNull: false 
      },
      status: { 
        type: Sequelize.ENUM('pending', 'approved', 'rejected'), 
        defaultValue: 'pending' 
      },
      userId: { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
        references: { 
            model: 'Users', 
            key: 'id' }, 
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
    await queryInterface.dropTable('CategoryRequests');
  }
};
