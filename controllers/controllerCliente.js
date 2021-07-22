const { Cliente } = require('../models/index');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');


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