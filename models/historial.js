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
      allowNull: false,
      field: 'prioridad'
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'estado'
    },
    detalle: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'detalle'
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'fecha'
    },
    empleadoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'empleado_id'
    },
    areaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'area_id'
    },
    solicitudId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'solicitud_id'
    }
  }, {});

  Historial.associate = (models) => {

    Historial.belongsTo(models.Solicitud, {
      foreignKey: 'solicitudId',
      as: 'solicitud'
    });
    
    Historial.belongsTo(models.Empleado, {
      foreignKey: 'empleadoId',
      as: 'empleado'
    });
    
    Historial.belongsTo(models.Area, {
      foreignKey: 'areaId',
      as: 'area'
    });

  };

  return Historial;
};
