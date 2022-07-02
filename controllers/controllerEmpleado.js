const { Empleado, Area } = require('../models/index');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const clg = require('../tools/clg');

//#######################################################
//################ POST LOGIN  EMPLEADO #################

async function login(req, res) {

    //await clg.info('Ingreso a handler para Empleado POST - /loginEmpleado');

    const body = req.body;
    //await clg.objeto(body, 'Body del formulario');

    if (!body.email || !body.pass) {

        return res.send('Dejá de tocarme el código del lado del cliente, pa');

    }

    try {

        const user = await Empleado.findOne({
            where: {
                email: body.email
            }
        });

        //await clg.objeto(user, 'Empleado.findOne');

        if (user) {

            // compara password del usuario con password hasheado en la BD
            const validPassword = await bcrypt.compare(body.pass, user.pass);

            if (validPassword) {

                const userSession = {
                    id: user.id,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    dni: user.dni,
                    email: user.email,
                    pass: user.pass,
                    telefono: user.telefono,
                    fechaAlta: user.fechaAlta,
                    verificado: user.verificado,
                    AreaId: user.AreaId,
                    verificado: user.verificado,
                    admin: user.AreaId == 3,
                    type: "empleado"
                }
                //configurar la session para no autenticar en cada requerimiento
                req.session.user = userSession;
                //await clg.objeto(user, "ACÁ VIENDO EL USER EMPLEADO RECUPERADO");

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
                msg: "No hay empleado registrado con este e-mail."
            })

        };

    } catch (error) {
        res.status(500).json(error);
    };

};

//##############################################################
//################# BUSCAR EMPELADOS ###########################

async function getById(id) {
    try {
        const empleado = await Empleado.findByPk(id, { include: [Area] });
        //console.log("empleado getById: ", empleado);
        return empleado;
    } catch (error) {
        return res.send(error);
    }
}

async function getAll(adminEmail) {
    console.log('Entró a funcion todos() de controllerEmpleado');
    try {
        const empleados = await Empleado.findAll({
            where: {
                email: {
                    [Op.notLike]: adminEmail
                }
            }
        });
        return empleados;
    } catch (error) {
        res.status(500).json(error);
    };
};

//##############################################################
//################# REGISTRO CLIENTE ###########################

async function create(form) {
    console.log('Entró a función crear() de controllerEmpleado');
    console.log(form)
    const { nombre, apellido, dni, email, telefono, pass, AreaId, verificado } = form;

    try {

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

        console.log("empleado_dni_email", empleado_dni_email);
        if (empleado_dni_email.length) {
            return -2
        };

        const salt = await bcrypt.genSalt(10);
        const pass_enc = await bcrypt.hash(pass, salt);

        const empleado_creado = await Empleado.create({
            nombre,
            apellido,
            dni,
            email,
            telefono,
            pass: pass_enc,
            AreaId,
            verificado: verificado == "1" ? true : false
        });

        return empleado_creado;
    } catch (error) {
        console.log("Error en controllerEmpleado.create", error)
        return error;
    }
};

//##############################################################
//################## EDITAR EMPLEADO ###########################

async function updateFromAdmin(id, form) {

    try {
        console.log("id: ", id);
        console.log("form: ", form);
        const affectedRows = await Empleado.update({
            nombre: form.nombre,
            apellido: form.apellido,
            dni: form.dni,
            telefono: form.telefono,
            verificado: form.verificado == "1" ? true : false,
            AreaId: form.AreaId
        }, {
            where: {
                id: id
            }
        });
        console.log("affectedRows: ", affectedRows);
        return affectedRows[0];
    } catch (error) {
        console.log("error en controller.updateFromAdmin")
        throw error;
    }

    //Empleado.update(req.body, {where:{id:req.body.id}})
}

async function updateEmpl(form) {

    let result = -1;
    try {
        const updatedRows = await Empleado.update({
            nombre: form.nombre,
            apellido: form.apellido,
            telefono: form.telefono,
            email: form.email
        },
            {
                where: {
                    dni: form.dni
                }
            });

        console.log("empleado actualizado!");

        result = updatedRows[0];
        return result;

    } catch (error) {
        throw error;
    }

}

//##############################################################
//################## ACTUALIZAR PASS ###########################

async function updatePass(form) {
    let result = -1;

    try {
        const findUser = await Empleado.findOne({
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

        const updatedRows = await Empleado.update({
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
    getById,
    updateFromAdmin,
    updateEmpl,
    updatePass,
    create
}