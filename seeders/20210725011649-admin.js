'use strict';
const bcrypt = require('bcrypt');

const id = `(SELECT id FROM areas WHERE nombre LIKE '%ADMINISTRACION%')`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('empleados', [{
       nombre: 'Ezequiel',
       dni: '36227970',
       email: 'eze@correo.com',
       pass: await bcrypt.hash('ezequiel', 10),
       telefono: '1123917575',
       AreaId: Sequelize.literal(id),
     }], {});
  
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('empleados', {
      dni: '36227970'
    }, {});
  }
};
