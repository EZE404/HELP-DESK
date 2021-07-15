'use strict';

module.exports = (sequelize, DataTypes) => {
  const Notificacion = sequelize.define('notificacion', {
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
  }, { tableName: 'notificacion' });

  Notificacion.associate = (models) => {

    Notificacion.belongsTo(models.solicitud, {
      foreignKey: 'solicitud_id',
      as: 'solicitud'
    });

  };

  return Notificacion;
};
