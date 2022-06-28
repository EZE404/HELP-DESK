const { Area, Empleado } = require('../models/index');
const { Op } = require('sequelize');


//##############################################################
//################### BUSCAR AREAS #############################

async function getAll() {
    console.log('Entró a funcion todos() de controllerArea');
    try {
        const areas = await Area.findAll();
        return areas;
    } catch (error) {
        return error;
    };
};

//##############################################################
//################### BUSCAR AREA #############################

async function getById(id) {
    try {
        const area = await Area.findByPk(id, {
            include: Empleado
        });
        return area;
    } catch (error) {
        return res.send(error);
    };
};

//##############################################################
//#################### REGISTRO AREA ###########################

async function newArea(form) {

    let result = -1
    try {
        const area_buscada = await Area.findAll({
            where: {
                nombre: form.nombre
            }
        });

        if (area_buscada.length) {
            result = -2;
            return result;
        };

        const area_creada = await Area.create({ nombre: form.nombre });

        if (area_creada.nombre) {
            result = 1;
            return result;
        }
        return result
    } catch (error) {
        return res.send(error);
    }
};

//##############################################################
//#################### EDITAR AREA #############################

async function updateAreaName(form) {

    let result = -1
    try {
        const area_buscada = await Area.findByPk(form.id);
        console.log("area_buscada", area_buscada);
        if (!area_buscada) {
            return result;
        };

        const affectedRows = await Area.update({
            nombre: form.nombre
        }, {
            where: {
                id: form.id
            }
        });

        console.log("affectedRows " + affectedRows[0]);

        result = affectedRows[0];
        return result;
    
    } catch (error) {
    
        return res.send(error);
    
    }
};

//##############################################################
//################# DESACTIVAR AREA ############################


//##############################################################

module.exports = {
    getAll,
    getById,
    newArea,
    updateAreaName
}