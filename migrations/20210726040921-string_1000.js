'use strict';

/**
 * * SE CAMBIA TAMAÑO DE VARCHAR EN solicituds.descripcion,
 * * historials.detalle y notificacions.mensaje de varchar(255) a varchar(1000)
 * */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async t => {

      await queryInterface.changeColumn('solicituds', 'descripcion', {
        type: Sequelize.DataTypes.STRING(1000),
      }, { transaction: t });
      await queryInterface.changeColumn('historials', 'detalle', {
        type: Sequelize.DataTypes.STRING(1000),
      }, { transaction: t });
      await queryInterface.changeColumn('notificacions', 'mensaje', {
        type: Sequelize.DataTypes.STRING(1000),
      }, { transaction: t });

    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async t => {


      await queryInterface.changeColumn('solicituds', 'descripcion', {
        type: Sequelize.DataTypes.STRING,
      }, { transaction: t });
      await queryInterface.changeColumn('historials', 'detalle', {
        type: Sequelize.DataTypes.STRING,
      }, { transaction: t });
      await queryInterface.changeColumn('notificacions', 'mensaje', {
        type: Sequelize.DataTypes.STRING,
      }, { transaction: t });

    })  
  }
};
