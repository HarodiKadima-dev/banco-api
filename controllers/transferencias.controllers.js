const transferenciaService = require("../services/transferencias.services");

function criarTransferencia(req,res,next){
    
    try{
    const {conta_origem_id, conta_destino_id,valor}= req.body;
    
    const cliente_id = req.usuario.cliente_id;
    
    const transferencia = transferenciaService.criarTransferencia(
        conta_origem_id,
        conta_destino_id,
        valor,
        cliente_id
    );
    
    res.status(201).json({
        mensagem:"Transferência realizada com sucesso",
        transferencia
    });
}catch(error){
    next(error);
}
}

function listarTransferencias(req,res,next){

    try{
        const cliente_id = req.usuario.cliente_id;
    

        const transferencias = transferenciaService.buscarTodasTransferencias(cliente_id);

        res.json(transferencias);

    }catch(error){
        next(error);
    }

}
function buscarTransferenciaPorId(req,res,next){
    try{
const cliente_id = req.usuario.cliente_id;
    
        
    const id = Number(req.params.id);
    
     const transferencia = transferenciaService.buscarTransferenciaPorId(id, cliente_id);
    
     res.json(transferencia);
     
     }catch(error){
         next(error);
     }
     
}
module.exports = {
    criarTransferencia,
    listarTransferencias,
    buscarTransferenciaPorId
}