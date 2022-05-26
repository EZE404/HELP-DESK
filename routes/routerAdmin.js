var express = require('express');
var router = express.Router();
const clg = require('../tools/clg');

const controllerCliente = require('../controllers/controllerCliente');
const controllerEmpleado = require('../controllers/controllerEmpleado');
const controllerArea = require('../controllers/controllerArea');

//########## MIDDLEWARE DE AUTORIZACIÓN ##########
router.use((req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login')
  }
  if(req.session.user.type == "empleado") {
    if (req.session.user.admin) {
      return next();
    }
  }

  return res.redirect('/');
})
//---------- MIDDLEWARE DE AUTORIZACIÓN ----------

router.get('/', (req, res) => {
  // REDIRECCIONO A UNA DE LAS SECCIONES PARA NO TENER UN INDEX VACÍO
  return res.redirect('/admin/clientes')

})

router.get('/clientes', async (req, res) => {
  // RENDERIZAR VISTA CON TABLA DE CLIENTES

  try {
    const listaClientes = await controllerCliente.getAll();
    return res.render('admin/clientes', {
      title: "Empleados",
      user: req.session.user,
      clientes: listaClientes
    })
  } catch (error) {
    return res.send(error);
  }

})

router.get('/clientes/:uuid', async (req, res) => {
  // RENDERIZAR FORMULARIO CON DETALLES DEL CLIENTE
  try {
    const client = await controllerCliente.getClientByUuid(req.params.uuid);
    console.log("client/uuid", client.nombre)
    if (client.nombre) {
      return res.render('admin/cliente', {
        title: "Detalles de cliente",
        user: req.session.user,
        client: client
      })
    }
    return res.send("No se encontró el Cliente. No me toque el código.");
  } catch (error) {
    return res.send(error);
  }

})

router.post('/clientes/:uuid', async (req, res) => {

  try {
    //console.log('clienteVerificado/router', client);
    const form = {}
    form.verificado = (req.body.verificado=="1") ? true : false;
    form.uuid = req.params.uuid;
    //return res.send(form);

    const result = await controllerCliente.updateClientStatus(form);
    const client = await controllerCliente.getClientByUuid(req.params.uuid);
    if (result == 1) {
      return res.render('admin/cliente', {
        title: "Detalles de cliente",
        user: req.session.user,
        client: client,
        msg: "Cliente actualizado."
      })
    } else if (result == 0) {
      return res.render('admin/cliente', {
        title: "Detalles de cliente",
        user: req.session.user,
        client: client,
        msg: "No se actualizó Cliente."
      })
    } else {
      return res.render('admin/cliente', {
        title: "Detalles de cliente",
        user: req.session.user,
        client: client,
        msg: "Ocurrió un error. Intente nuevamente."
      })
    }
  } catch (error) {
    return res.send(error);
  }
})

router.get('/areas', async (req, res) => {
  try {
    const areas = await controllerArea.getAll();
    return res.render('admin/areas', {
      title: "Areas",
      user: req.session.user,
      areas
    })
  } catch (error) {
    return res.send(error);
  }
})

router.get('/areas/:id', async (req, res) => {
  try {
    const area = await controllerArea.getById(req.params.id);
    if(area) {
      return res.render('admin/area', {
        title: "Editar área",
        user: req.session.user,
        area
      })
    }

    return res.send("No se encontró el área con id "+req.params.id);

  } catch (error) {
    return res.send(error);
  }
})

router.post('/areas/:id', async (req, res) => {
  try {
    const form = req.body;
    form.id = req.params.id;
    const result = await controllerArea.updateAreaName(form);
    const area = await controllerArea.getById(req.params.id);
    if(result == 1) {
      return res.render('admin/area', {
        title: "Editar área",
        user: req.session.user,
        area,
        msg: "Área actualizada"
      })
    } else if (result == 0) {
      return res.render('admin/area', {
        title: "Editar área",
        user: req.session.user,
        area,
        msg: "No se actualizaron datos."
      }) 
    } else if (result == -1) {
        return res.render('admin/area', {
          title: "Editar área",
          user: req.session.user,
          area,
          msg: "Ocurrió un error. Intente nuevamente."
        })
    }
  } catch (error) {
    return res.send(error);
  }
})

router.get('/area', (req, res) => {
  return res.render('admin/areaNew', {
    title: "Nueva área",
    user: req.session.user
  })
})

router.post('/area', async (req, res) => {
  //return res.send(req.body);
  try {
    const result = await controllerArea.newArea(req.body);
    if (result == 1) {
      return res.render('admin/areaNew', {
        title: "Nueva área",
        user: req.session.user,
        msg: "Área creada."
      })
    } else if (result == -2) {
      return res.render('admin/areaNew', {
        title: "Nueva área",
        user: req.session.user,
        msg: "Área ya existente."
      })
    }

    return res.render('admin/areaNew', {
      title: "Nueva área",
      user: req.session.user,
      msg: "No se creó nueva área. :("
    })
  } catch (error) {
    return res.send(error);
  }
})

router.get('/empleados', async (req, res) => {
  try {
    const empleados = await controllerEmpleado.getAll(req.session.user.email);
    return res.render('admin/empleados', {
      title: "Empleados",
      user: req.session.user,
      empleados
    })
  } catch (error) {
    return res.send(error);
  }
})

module.exports = router;