const { Area, Empleado } = require('../models/index');
const { Op } = require('sequelize');


//##############################################################
//################### BUSCAR AREAS #############################

async function todos(req, res) {
    console.log('Entró a funcion todos() de controllerArea');
    try {
        const areas = await Area.findAll();
        res.status(200).json(areas);
    } catch (error) {
        res.status(500).json(error);
    };
};

//##############################################################
//################### BUSCAR AREA #############################

async function area(req, res) {
    console.log('Entró a funcion area() de controllerArea');
    console.log(req.params);
    const areaId = req.params.id;


    try {
        const area = await Area.findByPk(areaId, {
            include: Empleado
        });
        res.status(200).json(area);
    } catch (error) {
        res.status(500).json(error);
    };
};

//##############################################################
//#################### REGISTRO AREA ###########################

async function crear(req, res) {
    console.log('Entró a función crear() de controllerCliente');
    console.log(req.body);
    const { nombre } = req.body;

    try {
        const area_buscada = await Area.findAll({
            where: {
                nombre
            }
        });

        if (area_buscada.length) {
            let aviso = {};

            aviso.msj = `Ya existe un area para: ${area_buscada[0].nombre}`
            return res.status(500).json(aviso);
        };

        const area_creada = await Area.create({ nombre });

        return res.status(200).json(area_creada)
    } catch (error) {
        return res.status(500).json(error);
    }
};

//##############################################################
//#################### EDITAR AREA #############################

async function editar(req, res) {
    console.log('Entró a función editar() de controllerCliente');
    console.log(req.body);
    const { id, nombre } = req.body;

    try {
        const area_buscada = await Area.findByPk(id);

        if (!area_buscada) {
            let aviso = {};

            aviso.msj = `No existe tal área`
            return res.status(500).json(aviso);
        };

        const area_actualizada = await Area.update({
            nombre
        }, {
            where: {
                id
            }
        });

        console.log(area_actualizada);

        let respuesta = {}
        respuesta.affectedRows = area_actualizada[0];
        return res.status(200).json(respuesta);
    
    } catch (error) {
    
        return res.status(500).json(error);
    
    }
};

//##############################################################
//################# DESACTIVAR AREA ############################


//##############################################################

module.exports = {
    todos,
    area,
    crear,
    editar
}