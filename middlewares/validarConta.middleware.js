const criarErro = require("../utils/criarErro");

function validarConta(req,res,next){

    const {saldo, cliente_id} = req.body;

    if(!cliente_id){
        criarErro("Cliente é obrigatório",400);
    }


    if(typeof saldo !== "number"){
        criarErro("O saldo deve ser um número",400);
    }

    if(saldo < 20000){
        criarErro("O saldo inicial deve ser de pelo menos 20000 Kz",400);
    }

    next();
}

module.exports = validarConta;