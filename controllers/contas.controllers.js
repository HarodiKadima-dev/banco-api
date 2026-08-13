const contaService = require("../services/contas.services");

function listarContas (req,res,next){
    try{
        
        const cliente_id = req.usuario.cliente_id;
        
    const contas = contaService.buscarTodasContas(cliente_id);
    res.json(contas);
}catch(error){
    next(error);
}
}

function buscarContaPorId(req,res,next){
    try{
    const id = Number(req.params.id);
    const cliente_id = req.usuario.cliente_id;
     const conta = contaService.buscarContaPorId(id, cliente_id);
    
     res.json(conta);
     
     }catch(error){
         next(error);
     }
     
}

function criarConta(req,res,next){
    
    try{
    const {saldo}= req.body;
    
    const cliente_id = req.usuario.cliente_id;
    
    const novaConta = contaService.criarConta(saldo, cliente_id);
    
    res.status(201).json({
        mensagem:"Conta criada com exito",
        conta:novaConta
    });
}catch(error){
    next(error);
}
}


function atualizarConta(req,res,next){
    try{
    
    const id = Number(req.params.id);
      const {saldo} = req.body;
      
      const cliente_id = req.usuario.cliente_id;
    
     const contaAtualizada = contaService.atualizarConta(id, 
     saldo,
     cliente_id
     );
     
    
     res.json(contaAtualizada);
     
}catch(error){
    next(error);
}
}

function apagarConta(req,res,next){

    try{

        const id = Number(req.params.id);

        const cliente_id = req.usuario.cliente_id;

        const contaRemovida = contaService.apagarConta(
            id,
            cliente_id
        );

        res.json({
            mensagem:"Conta deletada com exito",
            conta:contaRemovida
        });

    }catch(error){
        next(error);
    }
}
module.exports = {
    listarContas,
    buscarContaPorId,
    criarConta,
    atualizarConta,
    apagarConta
};