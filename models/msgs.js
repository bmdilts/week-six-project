'use strict';
module.exports = function(sequelize, DataTypes) {
  var msgs = sequelize.define('msgs', {
    gab: DataTypes.TEXT
  });
  msgs.associate = function(models){
    msgs.belongsTo(models.users);
    msgs.hasMany(models.likes);
  };
  return msgs;
};
