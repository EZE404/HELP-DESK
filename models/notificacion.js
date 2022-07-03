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
      field: 'SolicitudId',
      validate: {
        notNull: {
          args: true,
          msg: "El id de solicitud no puede ser nulo"
        },
        isInt: {
          args: true,
          msg: "El ID de solicitud debe ser un entero"
        },
        enteroPositivo(valor) {
          if (valor < 1) {
            throw new Error('El ID de solicitud debe ser un entero positivo')
          }
        }
      }
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'fecha',
      validate: {
        isDate: {
          args: true,
          msg: "Formato de fecha de notificación inválido"
        }
      }
    },
    mensaje: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'mensaje',
      validate: {
        len: {
          args: [100, 1000],
          msg: "El mensaje debe contener entre 100 y 1000 caracteres"
        }
      }
    },
    vista: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'vista'
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'tipo',
    }
  }, {});

  Notificacion.associate = (models) => {

    Notificacion.belongsTo(models.Solicitud);

  };

  return Notificacion;
};
