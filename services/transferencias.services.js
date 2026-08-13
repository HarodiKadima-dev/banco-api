const  transferenciaRepository = require("../repositories/transferencias.repository");
const {iniciarTransacao,
    confirmarTransacao,
    desfazerTransacao} = require("../database/transaction");

    //precisamos consultar ainda a consultar
    const contaRepository = require("../repositories/contas.repository");
    
const criarErro = require("../utils/criarErro");


function criarTransferencia(conta_origem_id, conta_destino_id, valor, cliente_id){
    
    //verificar a conta origem se existe
    const contaOrigem = contaRepository.buscarContaDoCliente(conta_origem_id, cliente_id);
    
    if(!contaOrigem){
        criarErro("Conta de origem não encontrada",404);
    }
    
    //verificar a conta destino se existe
    const contaDestino = contaRepository.buscarContaPorId(conta_destino_id);
    
    if(!contaDestino){
        criarErro("Conta de destino não encontrada",404);
    }
    
    if(!valor || valor <= 0){
        criarErro("O valor da transferência deve ser maior que zero",400);
    }
    if(conta_origem_id === conta_destino_id){
        criarErro("A conta de origem e destino devem ser diferentes",400);
    }
    if(contaOrigem.saldo < valor){
        criarErro("Saldo é insuficiente",400);
    }
    
    //begin
    iniciarTransacao();
    
    try{
    
    //retirar dinheiro na conta
    contaRepository.atualizarSaldo(
        conta_origem_id,
        contaOrigem.saldo - valor,
        cliente_id
        );
        
    
        //adicionar dinheiro na conta
        contaRepository.atualizarSaldoPorId(
            conta_destino_id,
            contaDestino.saldo + valor
            );
            
//historico de transferencias
const transferencia = transferenciaRepository.criarTransferencia(
    conta_origem_id,
    conta_destino_id,
    valor
    );
    
    //commit
    confirmarTransacao();
    
    return transferencia;
    
    }catch(error){
        //rollback
         desfazerTransacao();
         
         throw error;
    }
}
function buscarTodasTransferencias(cliente_id){
    return transferenciaRepository.buscarTodasTransferencias(cliente_id);
}

//buscar transferencia por id 
   function buscarTransferenciaPorId(id, cliente_id){

    const transferencia =
        transferenciaRepository.buscarTransferenciaPorId(id, cliente_id);

    if(!transferencia){
        criarErro("Transferência não encontrada",404);
    }

    return transferencia;
}
module.exports ={
    criarTransferencia,
    buscarTodasTransferencias,
    buscarTransferenciaPorId
}