'use strict';

//const id_area = `(SELECT id FROM areas WHERE nombre LIKE '%HELPDESK%' LIMIT 1)`;
const id_solicitud_1 = `(SELECT id FROM solicituds WHERE uuid LIKE '%DEMO1%' LIMIT 1)`;
const id_solicitud_2 = `(SELECT id FROM solicituds WHERE uuid LIKE '%DEMO2%' LIMIT 1)`;
const id_solicitud_3 = `(SELECT id FROM solicituds WHERE uuid LIKE '%DEMO3%' LIMIT 1)`;


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('historials', [{
      SolicitudId: Sequelize.literal(id_solicitud_1),
      detalle: "Semilla para DEMO1"
      //AreaId: Sequelize.literal(id_area)
    }, {
      SolicitudId: Sequelize.literal(id_solicitud_2),
      detalle: "Semilla para DEMO2"
      //AreaId: Sequelize.literal(id_area)
    }, {
      SolicitudId: Sequelize.literal(id_solicitud_3),
      detalle: "Semilla para DEMO3"
      //AreaId: Sequelize.literal(id_area)
    }], {});
  
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('historials', {
      SolicitudId: [Sequelize.literal(id_solicitud_1), Sequelize.literal(id_solicitud_2), Sequelize.literal(id_solicitud_3)]
    }, {});
  }
};
