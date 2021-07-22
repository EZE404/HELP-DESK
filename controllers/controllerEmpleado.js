const { Empleado, Area } = require('../models/index');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

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
    todos,
    crear
}