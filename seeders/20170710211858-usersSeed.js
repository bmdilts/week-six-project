'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {username:'admin',
      password:'password',
      displayName:'Brandon',
      createdAt: new Date(),
      updatedAt: new Date()},

      {username:'Bob',
      password:'12345',
      displayName:'Bob',
      createdAt: new Date(),
      updatedAt: new Date()},

      {username:'mrrogers',
      password:'neighbor',
      displayName:'Mr. Rogers',
      createdAt: new Date(),
      updatedAt: new Date()},

      {username:'leeloo',
      password:'multipass',
      displayName:'Leeloo',
      createdAt: new Date(),
      updatedAt: new Date()},
    ]);
},

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
