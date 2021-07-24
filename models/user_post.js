'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Post = sequelize.define(
    'User_Post', {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      }
    }, {
      timestamps: true,
      engine: 'InnoDB'
    }
  );

/*   User_Post.associate = function(models) {
    User_Post.belongsTo(models.User, {
      foreignKey: 'user_id',
      target: 'id'
    });

    User_Post.belongsTo(models.Post, {
      foreignKey: 'post_id',
      target: 'id'
    });

  } */

  return User_Post;
};