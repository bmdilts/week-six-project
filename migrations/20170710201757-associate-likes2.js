'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'likes', 'msgId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'cascade',
        references: {
          model: 'msgs',
          key: 'id'
        }
      }
    );
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('likes', 'msgId');
  }
};
