'use strict';

const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Empleado = sequelize.define('Empleado', {
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
      field: 'nombre',
      validate: {
        notNull: {
          msg: "El nombre no puede ser nulo"
        },
        notEmpty: {
          args: true,
          msg: "El nombre no puede estar vacío"
        },
        is: {
          args: /^[a-zA-Z]+([\s][a-zA-Z]+)*$/g,
          msg: "El nombre solo puede contener letras sin espacios dobles, ni espacios al principio y fin"
        }
      }
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'apellido',
      validate: {
        notNull: {
          msg: "El apellido no puede ser nulo"
        },
        notEmpty: {
          args: true,
          msg: "El apellido no puede estar vacío"
        },
        is: {
          args: /^[a-zA-Z]+([\s][a-zA-Z]+)*$/g,
          msg: "El apellido solo puede contener letras sin espacios dobles, ni espacios al principio y fin"
        }
      }
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'dni',
      validate: {
        notNull: {
          args: true,
          msg: "El DNI no puede ser nulo"
        },
        notEmpty: {
          args: true,
          msg: "El dni no puede estar vacío"
        },
        isNumeric: {
          args: true,
          msg: "El DNI solo puede contener números"
        },
        len: {
          args: [8, 10],
          msg: "El DNI debe ser una cadena de números de entre 8 y 10 dígitos"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'email',
      validate: {
        isEmail: {
          args: true,
          msg: "El correo debe ser una dirección válida"
        }
      }
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'pass',
      validate: {
        notContains: {
          args: ' ',
          msg: "La contraseña no puede contener espacios"
        },
        len: {
          args: [8, 64],
          msg: "La contraseña debe contener entre 8 y 64caracteres"
        }
      }
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'telefono',
      validate: {
        notEmpty: {
          args: true,
          msg: "El teléfono no puede estar vacío"
        },
        isNumeric: {
          args: true,
          msg: "El teléfono debe ser una cadena solo de números"
        },
        len: {
          args: [10, 14],
          msg: "El teléfono debe ser un número válido entre 10 y 14 dígitos"
        }

      }
    },
    fechaAlta: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'fecha_alta',
      validate: {
        isDate: {
          args: true,
          msg: "La fecha de alta tiene que ser una fecha válida"
        }
      }
    },
    AreaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      field: 'AreaId',
      validate: {
        isInt: {
          args: true,
          msg: "El ID de área debe ser un entero"
        },
        enteroPositivo(valor) {
          if (valor < 1 && valor != null) {
            throw new Error('El ID de área debe ser un entero positivo')
          }
        }
      }
    },
    verificado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      field: 'verificado',
      validate: {
        validar(valor) {
          if (typeof valor != 'boolean') {
            throw new Error("Verificado debe ser un booleano");
          }
        }
      }
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      field: 'admin',
      validate: {
        validar(valor) {
          if (typeof valor != 'boolean') {
            throw new Error("Admin debe ser un booleano");
          }
        }
      }
    }   
  }, {});

  Empleado.associate = (models) => {

    Empleado.belongsTo(models.Area);
    
    Empleado.hasMany(models.Historial);
  };
  
  return Empleado;
};
