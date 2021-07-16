const { Cliente, Solicitud } = require('../models/index');
const { Op } = require('sequelize');
const _ = require('lodash');

//#######################################################
//################## GET SOLICITUDES ####################

async function todo(req, res) {
    console.log('Entró a la función todo() de controllerSolicitud');
    console.log(req.body);
    const { dni } = req.body;
    try {

        const clientes_dni = await Cliente.findAll({
            where: {
                dni
            }
        });

        console.log('cliente buscado en todo() de controllerSolicitud', clientes_dni[0]);

        if (clientes_dni.length) {
            console.log('id de cliente encontrado: ',clientes_dni[0].id);

            const cliente_solicitudes = await Cliente.findByPk(clientes_dni[0].id, {
                include: Solicitud
            });

            console.log('cliente_solicitudes: ', cliente_solicitudes);
            
            let solicitudes_length = _.size(cliente_solicitudes.Solicituds);
            
            if (solicitudes_length) {
                return res.status(200).json(cliente_solicitudes.Solicituds);
            } else {
                return res.status(200).send(`No hay solicitudes para el cliente con dni ${dni}`);
            }
            
        }


/*         if (clientes_dni.length) {
            let solicitudes_length = _size(clientes_dni[0].solicitudes);
            if (solicitudes_length) {
                return res.status(200).json(clientes_dni[0].solicitudes);
            } else {
                return res.status(200).send(`No hay solicitudes para el cliente con dni ${dni}`);
            }
            
        } */

        return res.status(200).send(`No hay cliente con dni ${dni}`);
        
    } catch (error) {
        return res.status(500).json(error);
    }
}

//#######################################################
//################# CREAR SOLICCITUD ####################

async function crear(req, res) {
    console.log('Entró a la función crear() de controllerSolicitud');
    console.log(req.body);

    const { clienteId, tipo, descripcion, } = req.body;

    try {
        const cliente_buscado = await Cliente.findByPk(clienteId);
        console.log('cliente buscado en crear solicitud', cliente_buscado);

        if (cliente_buscado) {
            const solicitud_creada = await Solicitud.create({
                ClienteId : cliente_buscado.id,
                tipo,
                descripcion,
                
            });

            return res.status(200).json(solicitud_creada);
        } else {
            return res.send('no existe ese cliente');
        }


        
    } catch (error) {
        res.status(500).json(error);
    }
}

//#######################################################
module.exports = {
    todo,
    crear
}