const express = require('express');
const router = express.Router();
const autenticar = require("../middlewares/auth");

//buscar todas as rotas
const contaController = require("../controllers/contas.controllers");
//rota para busca
router.get("/contas", autenticar,contaController.listarContas);
//rota para busca especifica
router.get("/contas/:id",autenticar, contaController.buscarContaPorId);
// rota para criação
const validarConta = require("../middlewares/validarConta.middleware");

router.post(
    "/contas",
    autenticar,
    validarConta,
    contaController.criarConta
);
//rota para modificação
router.put("/contas/:id",autenticar,
contaController.atualizarConta);
//rota para deletar
router.delete("/contas/:id",autenticar,
contaController.apagarConta);
module.exports = router;