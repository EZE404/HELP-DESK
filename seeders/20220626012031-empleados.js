'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('empleados', [{
      nombre: 'Mario',
      apellido: 'Avaca',
      dni: '30111222',
      email: 'mario@correo.com',
      pass: await bcrypt.hash('Ezequiel99', 10),
      telefono: '2664101010',
      AreaId: 2
    },{
      nombre: 'Genaro',
      apellido: 'Farias',
      dni: '27222555',
      email: 'genaro@correo.com',
      pass: await bcrypt.hash('Ezequiel99', 10),
      telefono: '2664505050',
      AreaId: 1
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('empleados', {
      dni: ['30111222', '27222555']
    }, {});
  }
};
