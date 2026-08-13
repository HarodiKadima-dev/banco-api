const contaRepository = require("../repositories/contas.repository");
const criarErro = require("../utils/criarErro");
const clienteRepository = require("../repositories/clientes.repository");

function buscarTodasContas(cliente_id){
    return contaRepository.buscarTodasContas(cliente_id);
}


//get 
function buscarContaPorId(id, cliente_id){

    const conta = contaRepository.buscarContaPorId(id, cliente_id);

    if(!conta){
        criarErro("Conta não encontrada",404);
    }

    return conta;
}


// POST
function criarConta(saldo, cliente_id){

    const cliente = clienteRepository.buscarClientePorId(cliente_id);

if(!cliente){
    criarErro("Cliente não encontrado",400);
}
    
    const contaExistente = contaRepository.buscarContaPorClienteId(cliente_id);
    
    if(contaExistente){
        criarErro("Cliente já possui uma conta",400);
    }
    
    return contaRepository.criarConta(saldo,cliente_id);
}


// PUT

function atualizarConta(id,saldo, cliente_id){

    const conta = contaRepository.buscarContaPorId(id, cliente_id);

    if(!conta){
        criarErro("Conta não encontrada",404);
    }


    const contaExistente = contaRepository.buscarContaPorClienteId(cliente_id);

    if(contaExistente && contaExistente.id !== id){
        criarErro("Cliente já possui outra conta",400);
    }


    return contaRepository.atualizarConta(id,saldo,cliente_id);
}


// DELETE
function apagarConta(id, cliente_id){

    const conta = contaRepository.buscarContaPorId(id, cliente_id);

    if(!conta){
        criarErro("Não existe nenhuma conta com esse ID",404);
    }

    return contaRepository.apagarConta(id,cliente_id);
}


module.exports = {
    buscarTodasContas,
    criarConta,
    buscarContaPorId,
    atualizarConta,
    apagarConta

};