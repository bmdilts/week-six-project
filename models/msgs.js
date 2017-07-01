'use strict';
module.exports = function(sequelize, DataTypes) {
  var msgs = sequelize.define('msgs', {
    gab: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return msgs;
};