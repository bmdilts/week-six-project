'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'msgs', 'userId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'cascade',
        references: {
          model: 'users',
          key: 'id'
        }
      }
    );
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('msgs', 'userId');
  }
};
