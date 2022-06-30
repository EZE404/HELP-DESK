var express = require("express");
var router = express.Router();

const controller = require("../controllers/controllerSolicitud");

//#################################################

router.post("/", async (req, res) => {
    //return res.json(req.body);
    try {
        const solicitud = await controller.getSolicitudByUuid(req.body.uuid);
        if (solicitud instanceof Error) {
            return res.json(solicitud);
        }

        if (solicitud) {
            //return res.json(solicitud);
            return res.render('cliente/tracking', {
                title: "Tracking de Solicitud",
                solicitud
            })
        }

        return res.send("no se encontró soli");
    } catch (error) {
        return res.json(error);
    }
})

module.exports = router;
