'use strict';
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    displayName: DataTypes.STRING
  });
  users.associate = function(models){
    users.hasMany(models.likes);
    users.hasMany(models.msgs);
  };
  return users;
};
