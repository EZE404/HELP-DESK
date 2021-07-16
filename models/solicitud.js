'use strict';

const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Solicitud = sequelize.define('solicitud', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'id',
      autoIncrement: true
    },
    fechaAlta: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
      field: 'fecha_alta'
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'tipo'
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'descripcion'
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      field: 'uuid'
    }
  }, { tableName: 'solicitud' });

  Solicitud.associate = (models) => {

    Solicitud.belongsTo(models.cliente, {
      foreignKey: 'cliente_id',
      as: 'cliente'
    });
    
    Solicitud.hasMany(models.historial, {
      foreignKey: 'solicitud_id',
      as: 'historiales'
    });
    
    Solicitud.hasMany(models.notificacion, {
      foreignKey: 'solicitud_id',
      as: 'notificaciones'
    });
    
  }
  return Solicitud;
};
