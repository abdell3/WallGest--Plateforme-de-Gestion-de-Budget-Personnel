'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      { title: 'Alimentation', 
        budget: 2000, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { title: 'Transport', 
        budget: 1500, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { title: 'Loisirs', 
        budget: 1000, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { title: 'Santé', 
        budget: 800, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { title: 'Éducation', 
        budget: 1200, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
