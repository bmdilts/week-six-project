'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('likes', [
      {createdAt: new Date(),
      updatedAt: new Date(),
      userId: 14,
      msgId: 6},

      {createdAt: new Date(),
      updatedAt: new Date(),
      userId: 12,
      msgId: 7},

      {createdAt: new Date(),
      updatedAt: new Date(),
      userId: 13,
      msgId: 8},

      {createdAt: new Date(),
      updatedAt: new Date(),
      userId: 11,
      msgId: 9},
    ]);
},

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('likes');
  }
};
