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
      field: 'fecha_alta',
      validate: {
        isDate: {
          args: true,
          msg: "La fecha de alta tiene que ser una fecha válida"
        }
      }
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'tipo'
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'descripcion',
      validate: {
        len: {
          args: [100, 1000],
          msg: "La descripción debe contener entre 100 y 1000 caracteres"
        }
      }
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      field: 'uuid',
      validate: {
        isUUID: {
          args: 4,
          msg: "El UUID debe ser un UUIDV4 válido"
        }
      }
    },
    ClienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'ClienteId',
      validate: {
        notNull: {
          args: true,
          msg: "El id de cliente no puede ser nulo"
        },
        isInt: {
          args: true,
          msg: 'El id de cliente debe ser un entero'
        },
        enteroPositivo(valor) {
          if (valor < 1 && valor != null) {
            throw new Error('El ID de cliente debe ser un entero positivo')
          }
        }
      }
    },
    prioridad: {
      type: DataTypes.STRING,
      defaultValue: 'NORMAL',
      allowNull: false,
      field: 'prioridad',
      validate: {
        isIn: {
          args: [['ALTA', 'NORMAL', 'BAJA']],
          msg: "La prioridad debe ser 'ALTA', 'NORMAL', o 'BAJA' y en mayúsculas"
        },
        isUppercase: {
          args: true,
          msg: "La prioridad debe ser un valor en uppercase"
        }
      }
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: 'Pendiente',
      allowNull: false,
      field: 'estado',
      validate: {
        isIn: {
          args: ['Pendiente', 'En proceso', 'Solucionado'],
          msg: "El estado debe ser 'Pendiente', 'En proceso', o 'Solucionado'"
        }
      }
    },
    AreaId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
      field: 'AreaId',
      validate: {
        notNull: {
          args: true,
          msg: "El id de área no puede ser nulo"
        },
        isInt: {
          args: true,
          msg: "El ID de área debe ser un entero"
        },
        enteroPositivo(valor) {
          if (valor < 1) {
            throw new Error('El ID de área debe ser un entero positivo')
          }
        }
      }
    }
  }, {});

  Solicitud.associate = (models) => {

    Solicitud.belongsTo(models.Cliente);

    Solicitud.belongsTo(models.Area);
    
    Solicitud.hasMany(models.Historial);
    
    Solicitud.hasMany(models.Notificacion);
    
  }
  return Solicitud;
};
