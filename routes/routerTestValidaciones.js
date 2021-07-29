const express = require('express');
const router = express.Router();
const _ = require('lodash');

const { sequelize, Sequelize, Area, Cliente, Empleado, Solicitud, Historial, Notificacion, Sesion } = require('../models/index');

router.get('/query', async (req, res) => {

    const q = `select b.*, s.id as ids, tipo, descripcion, fecha_alta, ClienteId, uuid from solicituds s inner join (select h.* from historials h natural join (
        select SolicitudId, max(fecha) as fecha from historials
        where SolicitudId not in (
            SELECT distinct SolicitudId FROM historials
            WHERE estado = 'Solucionado'
            )
        and AreaId = 4
        group by SolicitudId) a) b on b.SolicitudId = s.id;`

    try {

        let opciones = {
            type: Sequelize.QueryTypes.SELECT,
            model: Historial,
            mapToModel: true
        }

        //await Historial._validateIncludedElements(opciones)

        const historiales = await sequelize.query(q, opciones);

        console.log(historiales[0] instanceof Historial);
        console.log(historiales[1] instanceof Historial);
        return res.status(200).json(historiales);
    
    } catch (error) {
        return res.status(500).json(error)
    }
})


//* VALIDANDO AREA
router.post('/area', async (req, res) => {

    let body = req.body;

    _.forIn(body, function (value, key) {
        if (typeof body[key] == 'string') {
            body[key] = value.trim();
        }
    });

    console.log('body trimeado');
    console.log(body);

    try {
        const area = await Area.build(body);
        const validacion = await area.validate();

        if (validacion) {
            return res.json(area);
        };

        console.log(validacion);
        return res.json(validacion);

    } catch (error) {
        return res.json(error);
    };

});

//* VALIDANDO CLIENTE
router.post('/cliente', async (req, res) => {

    let body = req.body;

    _.forIn(body, function (value, key) {
        if (typeof body[key] == 'string') {
            body[key] = value.trim();
        }
    });

    console.log('body trimeado');
    console.log(body);

    try {
        const cliente = await Cliente.build(body);
        const validacion = await cliente.validate();

        if (validacion) {
            return res.json(cliente);
        };

        console.log(validacion);
        return res.json(validacion);

    } catch (error) {
        return res.json(error);
    };

});

//* VALIDANDO EMPLEADO
router.post('/empleado', async (req, res) => {

    let body = req.body;

    _.forIn(body, function (value, key) {
        if (typeof body[key] == 'string') {
            body[key] = value.trim();
        }
    });

    console.log('body trimeado');
    console.log(body);

    try {
        const empleado = await Empleado.build(body);
        const validacion = await empleado.validate();

        if (validacion) {
            return res.json(empleado);
        };

        console.log(validacion);
        return res.json(validacion);

    } catch (error) {
        return res.json(error);
    };

});

//* VALIDANDO SOLICITUD
router.post('/solicitud', async (req, res) => {

    let body = req.body;

    _.forIn(body, function (value, key) {
        if (typeof body[key] == 'string') {
            body[key] = value.trim();
        }
    });

    console.log('body trimeado');
    console.log(body);

    try {
        const solicitud = await Solicitud.build(body);
        const validacion = await solicitud.validate();

        if (validacion) {
            return res.json(solicitud);
        };

        console.log(validacion);
        return res.json(validacion);

    } catch (error) {
        return res.json(error);
    };

});

//* VALIDANDO HISTORIAL
router.post('/historial', async (req, res) => {

    let body = req.body;

    _.forIn(body, function (value, key) {
        if (typeof body[key] == 'string') {
            body[key] = value.trim();
        }
    });

    console.log('body trimeado');
    console.log(body);

    try {
        const historial = await Historial.build(body);
        const validacion = await historial.validate();

        if (validacion) {
            return res.json(historial);
        };

        console.log(validacion);
        return res.json(validacion);

    } catch (error) {
        return res.json(error);
    };

});

//* VALIDANDO NOTIFICACION
router.post('/notificacion', async (req, res) => {

    let body = req.body;

    /*     _.forIn(body, function(value, key) {
            if (typeof body[key] == 'string') {
                body[key] = value.trim();
            }
        }); */

    console.log('body trimeado');
    console.log(body);

    try {
        const notificacion = await Notificacion.build(body);
        const validacion = await notificacion.validate();

        if (validacion) {
            return res.json(notificacion);
        };

        console.log(validacion);
        return res.json(validacion);

    } catch (error) {
        return res.json(error);
    };

});

//* VALIDANDO SESSION
router.post('/session', async (req, res) => {

    let body = req.body;

    console.log('body trimeado');
    console.log(body);

    try {
        const sesion = await Sesion.build(body);
        const validacion = await sesion.validate();

        if (validacion) {
            sesion.save();
            return res.json(sesion);
        };

        console.log(validacion);
        return res.json(validacion);

    } catch (error) {
        return res.json(error);
    };

});


module.exports = router