'use strict';

const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Historial = sequelize.define('Historial', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'id',
      autoIncrement: true
    },
    prioridad: {
      type: DataTypes.STRING,
      defaultValue: 'NORMAL',
      allowNull: false,
      field: 'prioridad'
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: 'Pendiente',
      allowNull: false,
      field: 'estado'
    },
    detalle: {
      type: DataTypes.STRING,
      defaultValue: 'Solicitud ingresante',
      allowNull: false,
      field: 'detalle'
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'fecha'
    },
    EmpleadoId: {
      type: DataTypes.INTEGER,
      field: 'EmpleadoId'
    },
    AreaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'AreaId'
    },
    SolicitudId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'SolicitudId'
    }
  }, {});

  Historial.associate = (models) => {

    Historial.belongsTo(models.Solicitud);
    
    Historial.belongsTo(models.Empleado);
    
    Historial.belongsTo(models.Area);

  };

  return Historial;
};
