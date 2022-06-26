'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('clientes', [{
      nombre: 'Gastón Sosa',
      dni: '40666777',
      email: 'sosa@correo.com',
      pass: await bcrypt.hash('Ezequiel99', 10),
      telefono: '1180805001'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('clientes', {
      dni: '40666777'
    }, {});
  }
};
