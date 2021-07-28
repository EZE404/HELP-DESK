'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('session', {
      sid: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      userId: Sequelize.STRING,
      expires: Sequelize.DATE,
      data: Sequelize.TEXT
    }, {
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('session');
  }
};
