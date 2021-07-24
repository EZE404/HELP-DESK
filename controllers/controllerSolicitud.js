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

async function getSolicitudByUuid(req, res) {
    await clg.info('Ingreso a handler para getSolicitudByUuid');
    await console.log('params.uuid', req.params.uuid);

    try {
        const solicitud = await Solicitud.findOne({
            where: {
                uuid: req.params.uuid
            },
            include: {
                model: Historial,
                include: Area
            },
            order: [[{model: Historial}, 'fecha', 'DESC']]
        });

        if (!solicitud) {
            return clg.info('Fallo al traer solicitud con historiales en getSolicitudByUuid');
        };

        return res.render('models/cliente_solicitud', {
            title: "Detalles de Reclamo",
            auth: true,
            type: req.session.type,
            solicitud
        })
    } catch(err) {

    };
};

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
//################## CREAR SOLICITUD ####################

/* async function crear2(req, res) {
    console.log('Entró a la función crear() de controllerSolicitud');
    console.log(req.body);

    if (!req.session.user) {
        return res.redirect('/');
    };

    if (!req.body.tipo || !req.body.descripcion) {
        return res.send('No me toques el código, bigote');
    };


    const { tipo, descripcion } = req.body;

    try {
        const cliente_buscado = await Cliente.findByPk(req.session.user.id);
        console.log('cliente buscado en crear solicitud', cliente_buscado);

        if (cliente_buscado) {
            const solicitud_creada = await Solicitud.build({
                ClienteId: req.session.user.id,
                tipo,
                descripcion
            });

            if (solicitud_creada) {
                const area = await Area.findOne({
                    where: {
                        nombre: {
                            [Op.like]: '%HELP DESK%'
                        }
                    }
                });

                if (!area) {
                    return res.send('no existe el area intentando guardar historial en alta de reclamo')
                };

                const historial_creado = await Historial.build({
                    SolicitudId: solicitud_creada.id,
                    fecha: solicitud_creada.fechaAlta,
                    AreaId: area.id
                });

                if (historial_creado) {
                    await historial_creado.setSolicitud(solicitud_creada);
                    await solicitud_creada.setHistorial(historial_creado);
                    await solicitud_creada.save();
                    await historial_creado.save();
                    return res.send('HOLAAAAAAAAAAAAAAAAA')
                }
            }

            return res.status(200).json(solicitud_creada);
        } else {
            return res.send('no existe ese cliente');
        }



    } catch (error) {
        res.status(500).json(error);
    }
} */


//############## CREAR EXPERIMENTAL #######################

async function crear(req, res) {

    const { tipo, descripcion } = req.body;
    const ClienteId = req.session.user.id;

    if (!req.session.user) {
        return res.redirect('/login');
    };

    if (!tipo || !descripcion) {
        return res.send('no me toques el código');
    };

    try {

        const area = await Area.findOne({
            where: {
                nombre: {
                    [Op.like]: '%HELP DESK%'
                }
            }
        });

        if (!area) {
            return res.send('no existe el area help desk');
        };

        const solicitud = await Solicitud.create({
            ClienteId,
            tipo,
            descripcion,
            Historials: [
                {
                    AreaId: area.id,
                }
            ]
            
        },{
            include: Historial
        });


        if(!solicitud) {
            return res.send('no funcó');
        };


        return res.json(solicitud);

    } catch (err) {
        return res.json(err);
    };

};

//#######################################################

async function getByClienteId(id) {
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


//#######################################################
module.exports = {
    form,
    todo,
    crear,
    getByClienteId,
    getSolicitudByUuid
}