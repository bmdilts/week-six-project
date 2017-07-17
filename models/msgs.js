'use strict';
module.exports = function(sequelize, DataTypes) {
  var msgs = sequelize.define('msgs', {
    gab: DataTypes.TEXT
  });
  msgs.associate = function(models){
    msgs.belongsTo(models.users, { onDelete: 'cascade', hooks: true });
    msgs.hasMany(models.likes, { onDelete: 'cascade', hooks: true });
  };
  return msgs;
};
