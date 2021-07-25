const express = require('express')
const router = express.Router()
const { Area, Cliente, Empleado, Solicitud, Historial, Notificacion } = require('../models/index');

//* VALIDANDO AREA
router.post('/area', async (req, res) => {

    const body = req.body;

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
    }

});

//* VALIDANDO CLIENTE
router.post('/cliente', async (req, res) => {

    const body = req.body;

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
    }

});


module.exports = router