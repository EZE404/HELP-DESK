const { Cliente, Solicitud, Historial, Area } = require('../models/index');
const { Op } = require('sequelize');
const _ = require('lodash');
const clg = require('../tools/clg.js');

//#######################################################
//################## FORM SOLICITUD #####################

async function form(req, res) {
    return res.render('forms/solicitud_crear', { title: "Cargar Reclamo" });
}


//#######################################################
//############# GET SOLICITUD BY UUID ###################

async function getById(id) {
    await clg.info('Ingreso a handler para getById');

    try {
        const solicitud = await Solicitud.findOne({
            where: {
                id
            },
            include: {
                model: Historial,
                include: Area
            },
            order: [[{ model: Historial }, 'fecha', 'DESC']]
        });

        if (!solicitud) {
            return clg.info('Fallo al traer solicitud con historiales en getSolicitudByUuid');
        };

        return solicitud
    } catch (err) {
        return err;
    };
};

async function getSolicitudByUuid(uuid) {
    await clg.info('Ingreso a handler para getSolicitudByUuid');

    try {
        const solicitud = await Solicitud.findOne({
            where: {
                uuid: uuid
            },
            include: [{
                model: Historial
            }, {
                model: Area
            }],
            order: [[{model: Historial}, 'fecha', 'DESC']]
        });

        if (!solicitud) {
            return clg.info('Fallo al traer solicitud con historiales en getSolicitudByUuid');
        };

        return solicitud
    } catch(err) {

    };
};

//#######################################################
//################## GET SOLICITUDES ####################

async function getAllNoResolvedByAreaId(id) {
    try {
        const solicitudes = await Solicitud.findAll({
            where : {
                AreaId: id,
                estado: {
                    [Op.not] : "Solucionado"
                }
            },
            include: { all: true, nested: true },
            order: [[{ model: Historial }, 'fecha', 'DESC']]
        })

        //const solicitudes = await Solicitud
        await console.log("###### solicitudes en empleado/index ##########")
        await console.log(solicitudes);
        return solicitudes;
    } catch (error) {
        return error
    }
}

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
            console.log('id de cliente encontrado: ', clientes_dni[0].id);

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

        return res.status(200).send(`No hay cliente con dni ${dni}`);

    } catch (error) {
        return res.status(500).json(error);
    }
}

//#######################################################
//################## CREAR SOLICITUD ####################

async function crear(form) {

    let res = 0

    const { tipo, descripcion, userId } = form;

    if (!tipo || !descripcion) {
        return res.send('no me toques el código');
    };

    try {

        const solicitud = await Solicitud.create({
            ClienteId : userId,
            tipo,
            descripcion,
            //prioridad: "NORMAL",
            Historials: [{}]
        },{
            include: Historial
        });


        console.log("####### creando solicitud ############");
        console.log(solicitud);
        if(!solicitud) {
            return console.log("no funcó la creación de una solicitud");
        };

        res = 1;
        return res;

    } catch (err) {
        return err;
    };

};

//#######################################################

async function getAllByClienteId(id) {
    try {

        const solicitudes = await Solicitud.findAll({
            where: {
                ClienteId: id
            },
            include: Historial,
            order: [[{ model: Historial }, 'fecha', 'DESC']]
        });

        if(!solicitudes) {
            return clg.info('No se pdieron obtener las solicitudes');
        }
        clg.objeto(solicitudes, 'Solicitudes encontradas');
        return solicitudes;
    } catch(err) {
        console.log(err);
    }
}

async function pending(sId) {
    try {
        let newHistorial;
        const affectedRows = await Solicitud.update({
            estado: "Pendiente"
        }, {
            where: {
                id: sId
            }
        })

        if (affectedRows[0]) {
            newHistorial = await Historial.create({
                detalle: "Liberada para ser atendida",
                SolicitudId: sId
            })
        }

        return newHistorial;
    } catch (error) {
        return error;
    }
}

async function inProcess(sId, uId) {
    try {
        let newHistorial;
        const affectedRows = await Solicitud.update({
            estado: "En proceso"
        }, {
            where: {
                id: sId
            }
        })

        if (affectedRows[0]) {
            newHistorial = await Historial.create({
                detalle: "Siendo atendida por un empleado",
                EmpleadoId: uId,
                SolicitudId: sId
            })
        }

        return newHistorial;
    } catch (error) {
        return error;
    }
}
//#######################################################
module.exports = {
    form,
    todo,
    crear,
    getAllNoResolvedByAreaId,
    getAllByClienteId,
    getSolicitudByUuid,
    getById,
    inProcess,
    pending
}