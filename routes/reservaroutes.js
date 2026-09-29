const express = require("express");

const {
    crearReserva,
    obtenerReservas,
    obtenerReservaPorId
} = require("../controllers/reservacontroller");

const router = express.Router();

router.post("/reservas", crearReserva);

router.get("/reservas", obtenerReservas);

router.get("/reservas/:id", obtenerReservaPorId);

module.exports = router;