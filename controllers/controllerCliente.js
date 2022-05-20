const { Cliente } = require('../models/index');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const clg = require('../tools/clg');

//#######################################################
//############### POST LOGIN CLIENTE ####################

async function login(req, res) {

    await clg.info('Ingreso a handler para Cliente POST - /login');
    
    const body = req.body;
    await clg.objeto(body, 'Body del formulario');

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
                return res.status(400).json({ error: "Password Inválido" });

            }

        } else {

            await clg.info(`El usuario ${body.email} no existe`);
            return res.status(401).json({ error: `El usuario ${body.email} no existe` });

        };

    } catch (error) {
        res.status(500).json(error);
    };

};

//##############################################################
//################## BUSCAR CLIENTES ###########################

async function todos(req, res) {
    console.log('Entró a funcion todos() de controllerCliente');
    try {
        const clientes = await Cliente.findAll();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json(error);
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
            return res.status(500).json(aviso);
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
        return res.status(200).json(cliente_creado)
    } catch (error) {
        return res.status(500).json(error);
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
    todos,
    crear,
    updateClient,
    updatePass
}