'use strict';
const passwordHash = require('password-hash');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin GelarIt',
        email: 'admin@gelarit.com',
        password: passwordHash.generate('admin123'),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      email: 'admin@gelarit.com'
    }, {});
  }
};
