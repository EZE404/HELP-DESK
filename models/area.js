'use strict';

module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define('area', {
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
  }, { tableName: 'area' });

  Area.associate = (models) => {

    Area.hasMany(models.empleado, {
      foreignKey: 'area_id',
      as: 'empleados'
    });
    
    Area.hasMany(models.historial, {
      foreignKey: 'area_id',
      as: 'historiales'
    });
    
  };
  
  return Area;
};
