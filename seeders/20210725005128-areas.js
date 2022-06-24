'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('areas', [{
      id: 1,
      nombre: 'HELPDESK',
      editable: false
    }, {
      id: 2,
      nombre: 'CALIDAD',
      editable: false
    }, {
      id: 3,
      nombre: 'ADMINISTRACION',
      editable: false
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('areas', {
      nombre: ['HELPDESK', 'CALIDAD', 'ADMINISTRACION']
    }, {});
  }
};
