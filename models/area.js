'use strict';

module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define('Area', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'id',
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'nombre'
    }
  }, {});

  Area.associate = (models) => {

    Area.hasMany(models.Empleado, {
      foreignKey: 'areaId',
      as: 'empleados'
    });
    
    Area.hasMany(models.Historial, {
      foreignKey: 'areaId',
      as: 'historiales'
    });
    
  };
  
  return Area;
};
