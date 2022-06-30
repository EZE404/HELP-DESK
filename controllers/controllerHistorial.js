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

async function transfer(s, form, eId) {
  try {
    let newHistorial;
    const { prioridad, detalle, AreaId } = form
    const solicitud = s.set({
      AreaId,
      prioridad,
      estado: "Pendiente"
    }).save()

    console.log("##### Solicitud save() ######")
    console.log(solicitud);
    if (solicitud) {
      newHistorial = await Historial.create({
        derivacion: true,
        detalle,
        EmpleadoId: eId,
        SolicitudId: s.id
      })
    }

    return newHistorial;
  } catch (error) {
    return error;
  }
}

async function solve(s, form, eId) {
  try {
    let newHistorial;
    const { prioridad, detalle } = form
    const solicitud = s.set({
      prioridad,
      estado: "Solucionado"
    }).save()

    console.log("##### Solicitud save() ######")
    console.log(solicitud);
    if (solicitud) {
      newHistorial = await Historial.create({
        detalle,
        EmpleadoId: eId,
        SolicitudId: s.id
      })
    }

    return newHistorial;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getAllBySessionAreaId,
  transfer,
  solve
}