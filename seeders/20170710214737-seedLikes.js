'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('likes', [
      {like: ['Leeloo'],
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 4,
      msgId: 1},

      {like: ['Bob'],
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 2,
      msgId: 2},

      {like: ['Mr. Rogers'],
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 3,
      msgId: 3},

      {like: ['Brandon'],
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 1,
      msgId: 4},
    ]);
},

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('likes');
  }
};
