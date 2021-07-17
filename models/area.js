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
      field: 'nombre',
      validate: {
        notNull: {
          args: true,
          msg: "El nombre no puede ser nulo"
        },
        notEmpty: {
          args: true,
          msg: "El nombre no puede estar vacío"
        }
      }
    }
  }, {});

  Area.associate = (models) => {

    Area.hasMany(models.Empleado);
    
    Area.hasMany(models.Historial);
    
  };
  
  return Area;
};
