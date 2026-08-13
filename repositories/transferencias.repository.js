const {getDb} = require("../database/database");

//post para  transferencia
function criarTransferencia(conta_origem_id, conta_destino_id, valor){
     const db = getDb();
     
     const resultado = db.run(
         "INSERT INTO transferencias(conta_origem_id, conta_destino_id, valor)VALUES(?,?,?)",
         [conta_origem_id,conta_destino_id,valor]
         );
         
         return{
            id:resultado.lastInsertRowid,
         conta_origem_id,
        conta_destino_id,
        valor
};
}

//get para as transferencias
function buscarTodasTransferencias(cliente_id){
    const db = getDb();
    
    const resultado = db.exec(
        "SELECT t. * FROM transferencias t JOIN contas c ON c.id =t.conta_origem_id OR c.id = t.conta_destino_id WHERE c.cliente_id = ?",
        [cliente_id]
        );
        if(resultado.length===0){
            return [];
        }
        
        return resultado[0].values.map((transferencia)=>{
            return{
                id:transferencia[0],
                conta_origem_id:transferencia[1],
                conta_destino_id:transferencia[2],
                valor:transferencia[3],
                created_at:transferencia[4]
            };
        });
}

// buscar conta por id
function buscarTransferenciaPorId(id,cliente_id){
    const db = getDb();
    
    const resultado = db.exec(
        "SELECT t. * FROM transferencias t JOIN contas c ON c.id = t.conta_origem_id OR c.id = t.conta_destino_id WHERE t.id = ? AND c.cliente_id = ?",
        [id, cliente_id]
        );
        
        if(resultado.length===0){
            return null;
        }
        
        const transferencia = resultado[0].values[0];
        
        return{
            id:transferencia[0],
            conta_origem_id:transferencia[1],
            conta_destino_id:transferencia[2],
            valor:transferencia[3],
            created_at:transferencia[4]
        };
}
module.exports = {
    criarTransferencia,
    buscarTodasTransferencias,
    buscarTransferenciaPorId
};