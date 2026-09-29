const express = require("express");

const { obtenerProductos } = require("../controllers/productocontroller");

const router = express.Router();

router.get("/productos", obtenerProductos);

module.exports = router;