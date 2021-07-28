'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sesion = sequelize.define(
    'Sesion', {
      sid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      userId: DataTypes.STRING,
      expires: {
        type: DataTypes.DATE,
        validate: {
          isDate: true
        }
      },
      data: DataTypes.TEXT
    }, {
      tableName: 'session'
    }
  );

  return Sesion;
};