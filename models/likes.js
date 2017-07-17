'use strict';
module.exports = function(sequelize, DataTypes) {
  var likes = sequelize.define('likes', {
    like: DataTypes.ARRAY(DataTypes.STRING)
  });
  likes.associate = function(models){
    likes.belongsTo(models.users, { onDelete: 'cascade', hooks: true });
    likes.belongsTo(models.msgs, { onDelete: 'cascade', hooks: true });
  };
  return likes;
};
