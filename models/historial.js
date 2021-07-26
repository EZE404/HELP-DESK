'use strict';

const moment = require('moment');
const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Historial = sequelize.define('Historial', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'id',
      autoIncrement: true
    },
    prioridad: {
      type: DataTypes.STRING,
      defaultValue: 'NORMAL',
      allowNull: false,
      field: 'prioridad',
      validate: {
        isIn: {
          args: ['ALTA','NORMAL','BAJA'],
          msg: "La prioridad debe ser 'ALTA', 'NORMAL', o 'BAJA'"
        },
        isUppercase: true
      }
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: 'Pendiente',
      allowNull: false,
      field: 'estado',
      validate: {
        isIn: {
          args: ['Pendiente', 'En proceso', 'Derivado', 'Solucionado'],
          msg: "El estado debe ser 'Pendiente', 'En proceso', 'Derivado' o 'Solucionado'"
        }
      }
    },
    detalle: {
      type: DataTypes.STRING,
      defaultValue: 'Solicitud ingresante',
      allowNull: false,
      field: 'detalle',
      validate: {
        len: {
          args: [100, 1000],
          msg: "El detalle debe contener entre 100 y 1000 caracteres"
        }
      }
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'fecha',
      validate: {
        isDate: {
          args: true,
          msg: "La fecha debe ser una fecha válida"
        },
        isAfter: {
          args:  moment().format("YYYY-MM-DD"),
          msg: "La fecha no puede ser anterior a la actual"
        }
      }
    },
    EmpleadoId: {
      type: DataTypes.INTEGER,
      field: 'EmpleadoId',
      validate: {
        isInt: {
          args: true,
          msg: "El ID de empleado debe ser un entero"
        },
        enteroPositivo(valor) {
          if (valor < 1 && valor != null) {
            throw new Error('El ID de empleado debe ser un entero positivo')
          }
        }
      }
    },
    AreaId: {
      type: DataTypes.INTEGER,
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
    }
  }, {});

  Historial.associate = (models) => {

    Historial.belongsTo(models.Solicitud);
    
    Historial.belongsTo(models.Empleado);
    
    Historial.belongsTo(models.Area);

  };

  return Historial;
};
