'use strict';

module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('cliente', {

    //########## ID ##################
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'id',
      autoIncrement: true
    },
    //############ NOMBRE #############
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'nombre',
      //--------- VALIDACION ----------
      validate: {
        notNull: {
          msg: "El nombre no puede ser nulo"
        },
        notEmpty: {
          args: true,
          msg: "El nombre no puede estar vacío"
        }
      }
      //--------------------------------
    },
    //############### DNI #################
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'dni'
    },
    //############## EMAIL #################
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'email'
    },
    //############ TELEFONO ################
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'telefono'
    },
    //########### CONTRASEÑA ##############
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'pass'
    },
    //############# VERIFICADO ##############
    verificado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      field: 'verificado'
    },
    //############# UUIDV4 ###########
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      field: 'uuid'
    }
    
  }, { tableName: 'cliente' });
  
  Cliente.associate = (models) => {

    Cliente.hasMany(models.solicitud, {
      foreignKey: 'cliente_id',
      as: 'solicitud'
    });

  };

  return Cliente;
};
