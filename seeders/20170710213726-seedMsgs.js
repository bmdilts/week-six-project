'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('msgs', [
      {gab: 'OMG! I love purple hair!',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 12},

      {gab: 'Moolteepasssss',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 14},

      {gab: 'One time at band camp...',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 11},

      {gab: "Won't you be my neighbor?",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 13},
    ]);
},

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('msgs');
  }
};
