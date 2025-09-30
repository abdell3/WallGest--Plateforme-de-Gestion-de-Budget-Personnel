'use strict';
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const adminRole = await queryInterface.sequelize.query(
      `SELECT id FROM Roles WHERE name = 'Admin' LIMIT 1;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (!adminRole || adminRole.length === 0) {
      throw new Error("⚠️ Le rôle Admin n'existe pas, lance d'abord le RoleSeeder !");
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);
    await queryInterface.bulkInsert('Users', [
      {
        fName: 'Abdo',
        lName: 'Admin',
        email: 'abdo.abdell.2000@gmail.com',
        password: hashedPassword,
        roleId: adminRole[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async odwn(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { email: 'abdo.abdell.2000@gmail.com' }, {});
  }
};
