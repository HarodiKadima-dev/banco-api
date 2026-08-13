const clienteRepository = require("../repositories/clientes.repository");
const criarErro = require("../utils/criarErro");

function criarCliente(nome){
    
    //regra do regex
    if(!/^[A-Za-zÀ-ÿ\s]+$/.test(nome)){
    criarErro("O nome deve conter apenas letras e espaços",400);
}
    if(!nome){
        criarErro("Nome é obrigatório",400);
    }
    //devido a simulação do bi
    if(nome.trim().length < 5){
        criarErro("O nome deve possuir pelo menos 5 caracteres ou mais",400);
    }
    

     return clienteRepository.criarCliente(nome);
}

function buscarTodosClientes(){
    
    return clienteRepository.buscarTodosClientes();
}

function buscarClientePorId(id){
     return clienteRepository.buscarClientePorId(id);
}

module.exports = {
    criarCliente,
    buscarTodosClientes,
    buscarClientePorId
};