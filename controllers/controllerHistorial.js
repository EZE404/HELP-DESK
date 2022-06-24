const { Empleado, Cliente, Solicitud, Historial, Area } = require('../models/index');
const { Op } = require('sequelize');
const _ = require('lodash');
const clg = require('../tools/clg.js');

async function getAllBySessionAreaId(id) {
  try {
    const historials = await Historial.findAll({
      where : {
        AreaId : id
      },
      include: Empleado
    })

/*     const solicitudesByAreaId = await Solicitud.findAll({
      include : {
        model : Historial,
        where : {
          AreaId: id
        }
      }
    })

    console.log("######### SOLICITUDES POR AREA ID ###########")
    console.log(solicitudesByAreaId); */
    return historials;
  } catch (error) {
    return error
  }
}

module.exports = {
  getAllBySessionAreaId
}