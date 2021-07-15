'use strict';

module.exports = (sequelize, DataTypes) => {
  const Empleado = sequelize.define('empleado', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'id'
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
  }, { tableName: 'empleado' });

  Empleado.associate = (models) => {

    Empleado.belongsTo(models.area, {
      foreignKey: 'area_id',
      as: 'area'
    });
    
    Empleado.hasMany(models.historial, {
      foreignKey: 'empleado_id',
      as: 'historiales'
    });
  };
  
  return Empleado;
};
