'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('clientes', [{
      nombre: 'Ezequiel',
      dni: '36227970',
      email: 'eze@correo.com',
      pass: await bcrypt.hash('Ezequiel99', 10),
      telefono: '1123917575',
      uuid: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('clientes', {
      email: 'eze@correo.com'
    }, {});
  }
};
