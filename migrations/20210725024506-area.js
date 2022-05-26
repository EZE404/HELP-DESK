'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('areas', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      activa: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      editable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    }, {
      charset: "utf8",
      collate: "utf8_spanish_ci"
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('areas');
  }
};
