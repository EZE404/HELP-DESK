'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      body: {
        type: DataTypes.STRING
      },
      date: {
        type: DataTypes.DATE
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, {
      timestamps: true,
      engine: 'InnoDB'
    }
  );

  Post.associate = function(models) {
    Post.belongsToMany(models.User, {
      through: 'User_Post',
      foreignKey: 'post_id',
      target: 'id',
      as: 'usuarios'
    });


  }

  return Post;
};