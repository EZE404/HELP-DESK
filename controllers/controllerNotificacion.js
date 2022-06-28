const { Cliente, Solicitud, Historial, Area, Notificacion, Empleado } = require('../models/index');
const { Op } = require('sequelize');
const _ = require('lodash');
const clg = require('../tools/clg.js');

async function getAll() {
  try {
    const notis = await Notificacion.findAll({
      include: {
        all: true,
        nested: true
      }
    });
    return notis;
  } catch (error) {
    return error;
  }
}

async function getById(id) {
  try {
    const noti = await Notificacion.findByPk(id, {
      include: [
        {
          model: Solicitud,
          include: {
            model: Historial,
            include: Empleado,
            order: [[Historial, 'fecha', 'DESC']]
          }
        }
      ]
    })

    return noti;
  } catch (error) {
    return error;
  }
}

async function updateSeen(id, vista) {
  try {
    const affectedRows = await Notificacion.update({
      vista
    }, {
      where: {
        id
      }
    })

    return affectedRows[0];
  } catch (error) {
    return error
  }
}

module.exports = {
  getAll,
  getById,
  updateSeen
}