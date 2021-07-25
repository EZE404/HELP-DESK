'use strict';

const id = `(SELECT id FROM clientes WHERE email = 'eze@correo.com')`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('solicituds', [{
      tipo: 'TEST C',
      descripcion: 'DEMO SOLICITUD 1',
      uuid: 'DEMO1',
      ClienteId: Sequelize.literal(id)
     },{
      tipo: 'TEST B',
      descripcion: 'DEMO SOLICITUD 2',
      uuid: 'DEMO2',
      ClienteId: Sequelize.literal(id)   
     }, {
      tipo: 'TEST A',
      descripcion: 'DEMO SOLICITUD 2',
      uuid: 'DEMO3',
      ClienteId: Sequelize.literal(id)
     }], {});
  
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('solicituds', {
      uuid: ['DEMO1', 'DEMO2', 'DEMO3']
    }, {});
  }
};
