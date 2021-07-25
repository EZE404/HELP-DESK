'use strict';

const { Sequelize } = require('sequelize');

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
    fechaAlta: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'fecha_alta'
    },
    //############# VERIFICADO ##############
    verificado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      field: 'verificado'
    }    
  }, {});

  Empleado.associate = (models) => {

    Empleado.belongsTo(models.Area);
    
    Empleado.hasMany(models.Historial);
  };
  
  return Empleado;
};
