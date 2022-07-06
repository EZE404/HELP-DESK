'use strict';

const event_scheduler_on = `SET @@GLOBAL.event_scheduler = 'ON';`
const event_scheduler_off = `SET @@GLOBAL.event_scheduler = 'OFF';`

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(event_scheduler_on);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(event_scheduler_off);
  }
};
