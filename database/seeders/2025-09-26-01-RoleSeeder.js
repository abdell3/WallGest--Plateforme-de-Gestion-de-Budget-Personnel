'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      { 
        name: 'Admin', 
        description: 'Administrateur', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        name: 'User', 
        description: 'Utilisateur standard', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
