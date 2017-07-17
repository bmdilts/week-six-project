'use strict';
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    displayName: DataTypes.STRING
  });
  users.associate = function(models){
    users.hasMany(models.likes, { onDelete: 'cascade', hooks: true });
    users.hasMany(models.msgs, { onDelete: 'cascade', hooks: true });
  };
  return users;
};
