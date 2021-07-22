//##################### IMPORTS ########################

const { Cliente, Empleado } = require('../models/index');
const bcrypt = require('bcrypt');
const clg = require('../tools/clg');

//#######################################################
//################## FORM LOGIN #########################

async function formLogin(req, res) {

    await clg.info('Ingreso a handler para GET - /login');

    res.render('login/login.pug', {
        title: "Ingresar"
    });

}

//#######################################################
//############### POST LOGIN CLIENTE ####################

async function loginCliente(req, res) {

    await clg.info('Ingreso a handler para POST - /loginCliente');
    
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
                req.session.user = user;
                req.session.type = "cliente";

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

}


//#######################################################
//################ POST LOGIN  EMPLEADO #################

async function loginEmpleado(req, res) {

    await clg.info('Ingreso a handler para POST - /loginEmpleado');
    
    const body = req.body;
    await clg.objeto(body, 'Body del formulario');

    if (!body.email || !body.pass) {

        return res.send('Dejá de tocarme el código del lado del cliente, pa');
    
    }

    try {

        const user = await Empleado.findOne({
            where: {
                email: body.email
            }
        });

        await clg.objeto(user, 'Empleado.findOne');
        
        if (user) {

            // compara password del usuario con password hasheado en la BD
            const validPassword = await bcrypt.compare(body.pass, user.pass);
    
            if (validPassword) {

                //configurar la session para no autenticar en cada requerimiento
                req.session.user = user;
                req.session.type = "empleado";

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

}

//#######################################################
//################## FORM SIGN UP #######################

async function formSignup(req, res) {
    await clg.info('Ingreso a handler para GET - /signup');
    
    return res.render('login/signup', {
        title: "Registrarse"
    });
}

//#######################################################
//################## POST SIGN UP #######################

/* async function signup(req, res) {

    const { email, pass } = req.body;

    if (!(body.email && body.password)) {

        return res.status(400).send('ghola');
    
    };

    try {
        const cliente_buscado = await Cliente.findOne({email});

        if (cliente_buscado) {
            return res.status(500).send(`Ya existe un registro con el email ${email}`);
        }
        // generar salt para hashear el password
        const salt = await bcrypt.genSalt(10);
        // hasheamos el password con salt anexado
        pass = await bcrypt.hash(pass, salt);

        const cliente = await Cliente.create()      
    } catch (error) {
        
    }

    
} */

//#########################################################
//################## MIDDLEWARES ##########################

async function validarLoginInv(req, res, next) {

    await clg.info('Verificación de logueo');

    if (!req.session.user) {

        await clg.info('No está logueado');
        
        return next();

    };

    await clg.info('Ya está logueado. Redirección a solicitudes');
    await clg.objeto(req.session.user, 'Usuario logueado');
    return res.redirect('/');

}

//########################################################
//###################### EXPORTS #########################

module.exports = {
    loginCliente,
    loginEmpleado,
    formLogin,
    formSignup,
    validarLoginInv
}

