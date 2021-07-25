'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('User', [{
      dni: '36363636',
      name: 'Ezequiel',
      address: '2 de abril',
      age: '29'
    },{
      dni: '30303030',
      name: 'Mario',
      address: 'lescano',
      age: '37'
    },{
      dni: '26262626',
      name: 'Genaro',
      address: 'allá abajo',
      age: '44'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('User', null, {});

  }
};
