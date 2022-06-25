'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('historials', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      detalle: {
        type: Sequelize.STRING,
        defaultValue: 'Solicitud ingresante',
        allowNull: false
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      derivacion: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      EmpleadoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'RESTRICT',
        references: {
          model: {
            tableName: 'empleados'
          },
          key: 'id'
        }
      },
      SolicitudId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'RESTRICT',
        references: {
          model: {
            tableName: 'solicituds'
          },
          key: 'id'
        }
      }
    }, {
      charset: "utf8",
      collate: "utf8_spanish_ci"
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('historials');
  }
};
