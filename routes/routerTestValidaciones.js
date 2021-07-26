const express = require('express');
const router = express.Router();
const _ = require('lodash');

const { Area, Cliente, Empleado, Solicitud, Historial, Notificacion } = require('../models/index');

//* VALIDANDO AREA
router.post('/area', async (req, res) => {

    let body = req.body;

    _.forIn(body, function(value, key) {
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

    _.forIn(body, function(value, key) {
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

    _.forIn(body, function(value, key) {
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

    _.forIn(body, function(value, key) {
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

    _.forIn(body, function(value, key) {
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


module.exports = router