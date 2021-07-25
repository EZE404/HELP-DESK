'use strict';

//* SE AGREGA COLUMNA 'ACTIVA' A TABLA 'AREAS'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async t => {

      await queryInterface.addColumn('areas', 'activa', {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }, { transaction: t });

    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async t => {

      await queryInterface.removeColumn('areas', 'activa', { transaction: t });

    })  
  }
};
