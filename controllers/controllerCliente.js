const { Cliente } = require('../models/index');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const clg = require('../tools/clg');

//#######################################################
//############### POST LOGIN CLIENTE ####################

async function login(req, res) {

    const body = req.body;

    if (!body.email || !body.pass) {
        return res.send('Dejá de tocarme el código del lado del cliente, pa');
    }

    try {

        const user = await Cliente.findOne({
            where: {
                email: body.email
            }
        });

        await clg.objeto(user, 'Client.findOne');
        
        if (user) {

            if (!user.verificado) {
                return res.render('login/login', {
                    title: "Ingresar",
                    msg: "Espere ser aprobado."
                })
            }
            // compara password del usuario con password hasheado en la BD
            const validPassword = await bcrypt.compare(body.pass, user.pass);
    
            if (validPassword) {

                //configurar la session para no autenticar en cada requerimiento
                const userSession = {
                    id: user.id,
                    nombre: user.nombre,
                    dni: user.dni,
                    email: user.email,
                    telefono: user.telefono,
                    fechaAlta:user.fechaAlta,
                    pass: user.pass,
                    verificado: user.verificado,
                    uuid: user.uuid,
                    type: "cliente"
                }
                req.session.user = userSession;
                //req.session.user.type = "cliente";

                await clg.info(`${user.email} autenticado`);
                //return res.status(200).json({ message: "Usuario Autenticado" });
                return res.redirect('/');

            } else {

                await clg.info('Contraseña inválida');
                return res.render('login/login', {
                    title: "Ingresar",
                    msg: "Datos inválidos"
                })

            }

        } else {

            await clg.info(`El usuario ${body.email} no existe`);
            return res.render('login/login', {
                title: "Ingresar",
                msg: "No hay usuario registrado con este e-mail."
            })

        };

    } catch (error) {
        res.status(500).json(error);
    };

};

//##############################################################
//################## BUSCAR CLIENTES ###########################

async function getAll(req, res) {
    console.log('Entró a funcion todos() de controllerCliente');
    try {
        const clientes = await Cliente.findAll();
        return clientes;
    } catch (error) {
        return error;
    };
};
//##############################################################
//############## BUSCAR CLIENTE POR UUID #######################

async function getClientByUuid(uuid) {
    console.log('Entró a funcion getClientByUuid() de controllerCliente');
    try {
        const user = await Cliente.findOne({
            where: {
                uuid: uuid
            }
        });
        console.log("uuid client", user.nombre);
        return user;
    } catch (error) {
        return error;
    };
};

//##############################################################
//################# REGISTRO CLIENTE ###########################

async function crear(req, res) {
    console.log('Entró a función crear() de controllerCliente');
    console.log(req.body);
    const { nombre, dni, email, telefono, pass } = req.body;

    if (!(email && pass)) {
        return res.status(400).send('ghola');
    };

    try {
        const clientes_dni_email = await Cliente.findAll({
            where: {
                
                [Op.or]: [
                    {
                        email: email
                    },
                    {
                        dni: dni
                    }
                ]
            }
        });
        console.log('Pasó línea 44');
        if (clientes_dni_email.length) {
            let aviso = {};
            if (clientes_dni_email[0].dni == dni) {
                aviso.dni = `Ya existe un cliente con el dni ${dni}`
            }
            if (clientes_dni_email[0].email == email) {
                aviso.email = `Ya existe un cliente con el correo ${email}`
            }
            return res.render('login/signup', {
                title: "Registrarse",
                msg: aviso.email || aviso.dni
            });
        };
        console.log('Pasó línea 55');
        // generar salt para hashear el password
        const salt = await bcrypt.genSalt(10);
        console.log('Pasó salt');
        // hasheamos el password con salt anexado
        
        const pass_enc = await bcrypt.hash(pass, salt);
        console.log('pasó hash', pass);
        const cliente_creado = await Cliente.create({
            nombre,
            dni,
            email,
            telefono,
            pass: pass_enc
        });
        clg.info(cliente_creado instanceof Cliente)
        return res.render('login/login', {
            title: "Ingresar",
            msg: "Cuenta creada. Espere ser aprobado."
        })
    } catch (error) {
        return res.json(error);
    }
};

//##############################################################
//################# EDITAR CLIENTE #############################

async function updateClient(form) {

    let result = -1;
    try {
        const updatedRows = await Cliente.update({
            nombre: form.nombre,
            telefono: form.telefono,
            email: form.email
        },
        {
            where: {
                dni: form.dni
            }
        });

        console.log("cliente actualizado!");

        result = updatedRows[0];
        return result;
        
    } catch (error) {
        throw error;
    }

}

async function updateClientStatus(form) {

    let result = -1;
    try {
        const updatedRows = await Cliente.update({
            verificado: form.verificado
        },
            {
                where: {
                    uuid: form.uuid
                }
            });

        console.log("cliente actualizado!");

        result = updatedRows[0];
        return result;

    } catch (error) {
        throw error;
    }

}
async function updatePass(form) {
    let result = -1;

    try {
        const findUser = await Cliente.findOne({
            where: {
                dni: form.dni
            }
        });

        if (findUser) {
            // compara password del usuario con password hasheado en la BD
            const validPassword = await bcrypt.compare(form.pass, findUser.pass);
            if (!validPassword) {
                return -2;
            }
        }

        // generar salt para hashear el password
        const salt = await bcrypt.genSalt(10);

        // hasheamos el password con salt anexado
        const pass_enc = await bcrypt.hash(form.newpass, salt);

        const updatedRows = await Cliente.update({
            pass: pass_enc
        },
        {
            where: {
                dni: form.dni
            }
        });

        result = updatedRows[0];
        return result;
    } catch (error) {
        throw error;
    }
}

//##############################################################
//################# BAJA CLIENTE ###############################


//##############################################################

module.exports = {
    login,
    getAll,
    getClientByUuid,
    crear,
    updateClient,
    updateClientStatus,
    updatePass
}