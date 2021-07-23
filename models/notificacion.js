'use strict';

module.exports = (sequelize, DataTypes) => {
  const Notificacion = sequelize.define('Notificacion', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'id',
      autoIncrement: true
    },
    SolicitudId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'SolicitudId'
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'fecha'
    },
    mensaje: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'mensaje'
    }
  }, {});

  Notificacion.associate = (models) => {

    Notificacion.belongsTo(models.Solicitud);

  };

  return Notificacion;
};
