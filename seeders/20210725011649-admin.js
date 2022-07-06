'use strict';
const bcrypt = require('bcrypt');

//const id = `(SELECT id FROM areas WHERE nombre LIKE '%ADMINISTRACION%')`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('empleados', [{
      nombre: 'Ezequiel',
      apellido: 'Albornoz',
      dni: '36227970',
      email: 'admin@correo.com',
      pass: await bcrypt.hash('Ezequiel99', 10),
      telefono: '1123917575',
      AreaId: 3
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('empleados', {
      dni: '36227970'
    }, {});
  }
};
