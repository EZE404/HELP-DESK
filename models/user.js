'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      dni: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      age: {
        type: DataTypes.INTEGER
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

  User.associate = function(models) {
    User.belongsToMany(models.Post, {
      through: 'User_Post',
      foreignKey: 'user_id',
      target: 'id',
      as: 'posteos'
    });


  }

  return User;
};