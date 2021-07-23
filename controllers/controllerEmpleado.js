const { Empleado, Area } = require('../models/index');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const clg = require('../tools/clg');

//#######################################################
//################ POST LOGIN  EMPLEADO #################

async function login(req, res) {

    await clg.info('Ingreso a handler para Empleado POST - /loginEmpleado');
    
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

};

//##############################################################
//################# BUSCAR CLIENTE #############################

async function todos(req, res) {
    console.log('Entró a funcion todos() de controllerEmpleado');
    try {
        const empleados = await Empleado.findAll();
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json(error);
    };
};

//##############################################################
//################# REGISTRO CLIENTE ###########################

async function crear(req, res) {
    console.log('Entró a función crear() de controllerEmpleado');
    console.log(req.body);
    const { nombre, dni, email, telefono, pass, rol } = req.body;
    
    let area_id = req.body.areaId;

    console.log(req.body.areaId);

    if (typeof area_id == 'undefined') {
        area_id = null;
    }

    try {

        if (req.body.areaId != null) {
            const area_buscada = await Area.findByPk(req.body.areaId);
            if(!area_buscada) {
                return res.status(500).send('No existe el area señalada');
            }
        }
        

        const empleado_dni_email = await Empleado.findAll({
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

        if (empleado_dni_email.length) {
            let aviso = {};
            if (empleado_dni_email[0].dni == dni) {
                aviso.dni = `Ya existe un empleado con el dni ${dni}`
            }
            if (empleado_dni_email[0].email == email) {
                aviso.email = `Ya existe un empleado con el correo ${email}`
            }
            return res.status(500).json(aviso);
        };

        const salt = await bcrypt.genSalt(10);        
        const pass_enc = await bcrypt.hash(pass, salt);
        
        const empleado_creado = await Empleado.create({
            nombre,
            dni,
            email,
            telefono,
            pass: pass_enc,
            rol,
            AreaId: area_id
        });

        return res.status(200).json(empleado_creado)
    } catch (error) {
        return res.status(500).json(error);
    }
};

//##############################################################
//################# EDITAR CLIENTE #############################

async function editar(req, res) {

    Empleado.update(req.body, {where:{id:req.body.id}})
}


//##############################################################
//################# BAJA CLIENTE ###############################


//##############################################################

module.exports = {
    login,
    todos,
    crear
}