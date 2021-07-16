'use strict';

module.exports = (sequelize, DataTypes) => {
  const Empleado = sequelize.define('Empleado', {
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
      field: 'nombre'
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'dni'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'email'
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'pass'
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'telefono'
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'rol'
    },
    fechaAltum: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'fecha_altum'
    }
  }, {});

  Empleado.associate = (models) => {

    Empleado.belongsTo(models.Area, {
      foreignKey: 'areaId',
      as: 'area'
    });
    
    Empleado.hasMany(models.Historial, {
      foreignKey: 'empleadoId',
      as: 'historiales'
    });
  };
  
  return Empleado;
};
