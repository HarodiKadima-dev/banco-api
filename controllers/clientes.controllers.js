const clienteService = require("../services/clientes.services");

function criarCliente(req,res,next){
    
    try{
    const {nome}= req.body;
    
    const novoCliente = clienteService.criarCliente(nome);
    
    res.status(201).json({
        mensagem:"Cliente registado com sucesso",
        cliente:novoCliente
    });
}catch(error){
    next(error);
}
}
function listarClientes (req,res,next){
    
    try{
    const clientes = clienteService.buscarTodosClientes();
    res.json(clientes);
    
}catch(error){
    next(error);
}
}
module.exports = {
    criarCliente,
    listarClientes
}