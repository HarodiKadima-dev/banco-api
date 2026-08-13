const express = require("express");
const router = express.Router();

const transferenciaController = require("../controllers/transferencias.controllers");
const autenticar = require("../middlewares/auth");

router.post(
    "/transferencias",
    autenticar,
    transferenciaController.criarTransferencia
);

router.get(
    "/transferencias",
    autenticar,
    transferenciaController.listarTransferencias
    );
    router.get(
    "/transferencias/:id",
    autenticar,
    transferenciaController.buscarTransferenciaPorId
);

module.exports = router;