const {getDb} = require("../database/database");

//post
function criarConta(saldo, cliente_id){
    
    const db = getDb();
    
    const resultado = db.run(
        "INSERT INTO contas(saldo,cliente_id)VALUES(?,?)",
        [saldo, cliente_id]
        );
        
        return {
            id: resultado.lastInsertRowid,
             saldo,
             cliente_id
        };
}
    //buscar por cliente 
function buscarContaPorClienteId(cliente_id){
     
     const db = getDb();
     
     const resultado = db.exec(
         "SELECT * FROM contas WHERE cliente_id = ?",
         [cliente_id]
         
         );
         if(resultado.length === 0){
             return null
         }
         
         const conta = resultado[0].values[0];
         
         return {
             id:conta[0],
             saldo:conta[1],
             cliente_id:conta[2],
         };
}

//get 
function buscarTodasContas(cliente_id){
    const db = getDb();
    
    const resultado = db.exec(
        "SELECT * FROM contas WHERE cliente_id = ?",
        [cliente_id]);
        
        if(resultado.length ===0){
            return [];
        }
        
        return resultado[0].values.map((conta)=>{
           return {
               id:conta[0],
               saldo:conta[1],
               cliente_id:conta[2]
           }; 
        });
}
function buscarContaPorId(id){

    const db = getDb();

    const resultado = db.exec(
        "SELECT * FROM contas WHERE id = ?",
        [id]
    );

    if(resultado.length === 0){
        return null;
    }

    const conta = resultado[0].values[0];

    return {
        id: conta[0],
        saldo: conta[1],
        cliente_id: conta[2]
    };
}


function buscarContaDoCliente(id, cliente_id){

    const db = getDb();

    const resultado = db.exec(
        "SELECT * FROM contas WHERE id = ? AND cliente_id = ?",
        [id, cliente_id]
    );

    if(resultado.length === 0){
        return null;
    }

    const conta = resultado[0].values[0];

    return {
        id: conta[0],
        saldo: conta[1],
        cliente_id: conta[2]
    };
}

//put
function atualizarConta(id,saldo,cliente_id){
    const db = getDb();
    
    const conta = buscarContaDoCliente(id, cliente_id);
    
    if(!conta){
        return null;
    }
    db.run(
    "UPDATE contas SET saldo=? WHERE id=? AND cliente_id = ?",
[saldo,id,cliente_id]
    );
return {
    id,
    saldo,
    cliente_id
};

}

//delete

function apagarConta(id,cliente_id){
    const db = getDb();
    
    const conta = buscarContaDoCliente(id, cliente_id);
    
    if(!conta){
        return null;
    }
    db.run("DELETE FROM contas WHERE id=? AND cliente_id = ?",
    [id,cliente_id]
    );
    return conta;
}

//atualizar saldo
function atualizarSaldo(id, saldo, cliente_id){
    const db = getDb();
    
    const conta = buscarContaDoCliente(id, cliente_id);
    
    if(!conta){
        return null;
    }
    db.run(
    "UPDATE contas SET saldo=? WHERE id=? AND cliente_id = ?",
[saldo,id,cliente_id]
    );
return {
    id,
    saldo
};

}

function atualizarSaldoPorId(id, saldo){
    const db = getDb();
    
    const conta = buscarContaPorId(id);
    if(!conta){
        return null;
    }
    
    db.run(
        "UPDATE contas set saldo = ? WHERE id = ?",
        [saldo, id]
        );
        
        return {
            id,
            saldo
        };
}
    module.exports={
        criarConta,
        buscarContaPorClienteId,
        buscarTodasContas,
        buscarContaPorId,
        buscarContaDoCliente,
        atualizarConta,
        apagarConta,
        atualizarSaldo,
        atualizarSaldoPorId
    };
    