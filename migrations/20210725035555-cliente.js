'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('clientes', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      apellido: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dni: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      pass: {
        type: Sequelize.STRING,
        allowNull: false
      },
      telefono: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fecha_alta: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      verificado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true
      } 
    }, {
      charset: "utf8",
      collate: "utf8_spanish_ci"
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('clientes');
  }
};
