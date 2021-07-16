const { Cliente } = require('../models/index');
const { Op } = require('sequelize');


//##############################################################
//################# BUSCAR CLIENTE #############################

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
//################# ALTA CLIENTE ###############################

async function crear(req, res) {
    console.log('Entró a función crear() de controllerCliente');
    console.log(req.body);
    const { nombre, dni, email, telefono, pass } = req.body;

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

        const cliente_creado = await Cliente.create({
            nombre,
            dni,
            email,
            telefono,
            pass
        });

        return res.status(200).json(cliente_creado)
    } catch (error) {
        return res.status(500).json(error);
    }
};

//##############################################################
//################# EDITAR CLIENTE #############################


//##############################################################
//################# BAJA CLIENTE ###############################


//##############################################################

module.exports = {
    todos,
    crear
}