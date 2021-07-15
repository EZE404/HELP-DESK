'use strict';

module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('cliente', {
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
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'telefono'
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'pass'
    }
  }, { tableName: 'cliente' });
  
  Cliente.associate = (models) => {

    Cliente.hasMany(models.solicitud, {
      foreignKey: 'cliente_id',
      as: 'solicitudes'
    });

  };

  return Cliente;
};
