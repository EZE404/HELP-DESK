'use strict';

const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Solicitud = sequelize.define('Solicitud', {
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
  }, {});

  Solicitud.associate = (models) => {

    Solicitud.belongsTo(models.Cliente);
    
    Solicitud.hasMany(models.Historial);
    
    Solicitud.hasMany(models.Notificacion);
    
  }
  return Solicitud;
};
