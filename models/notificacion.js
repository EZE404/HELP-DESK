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
    solicitudId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'solicitud_id'
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

    Notificacion.belongsTo(models.Solicitud, {
      foreignKey: 'solicitudId',
      as: 'solicitud'
    });

  };

  return Notificacion;
};
