'use strict';

module.exports = (sequelize, DataTypes) => {
  const Historial = sequelize.define('historial', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'id'
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
  }, { tableName: 'historial' });

  Historial.associate = (models) => {

    Historial.belongsTo(models.solicitud, {
      foreignKey: 'solicitud_id',
      as: 'solicitud'
    });
    
    Historial.belongsTo(models.empleado, {
      foreignKey: 'empleado_id',
      as: 'empleado'
    });
    
    Historial.belongsTo(models.area, {
      foreignKey: 'area_id',
      as: 'area'
    });

  };

  return Historial;
};
