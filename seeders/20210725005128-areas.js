'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('areas', [{
      nombre: 'HELPDESK',
      editable: false
    }, {
      nombre: 'CALIDAD',
      editable: false
    }, {
      nombre: 'ADMINISTRACION',
      editable: false
    }, {
      nombre: 'SERVICIO TECNICO'
    }, {
      nombre: 'RRHH'
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('areas', {
      nombre: ['HELPDESK', 'CALIDAD', 'ADMINISTRACION', 'SERVICIO TECNICO', 'RRHH']
    }, {});
  }
};
