'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('msgs', [
      {gab: 'OMG! I love purple hair!',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 2},

      {gab: 'Moolteepasssss',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 4},

      {gab: 'One time at band camp...',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 1},

      {gab: "Won't you be my neighbor?",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 3},
    ]);
},

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('msgs');
  }
};
