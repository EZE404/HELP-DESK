'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('notificacions', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
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
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false
      },
      mensaje: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }, {
      charset: "utf8",
      collate: "utf8_spanish_ci"
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('notificacions');
  }
};
