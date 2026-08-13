const express = require("express");

const router = express.Router();

const usuarioController = require("../controllers/usuarios.controllers");

router.post(
    "/login",
    usuarioController.login
);
router.post(
    "/usuarios",
    usuarioController.criarUsuario
);

module.exports = router;