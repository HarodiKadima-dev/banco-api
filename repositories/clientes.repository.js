const {getDb} = require("../database/database");

//criar
function criarCliente(nome){
    

const db = getDb();

const resultado = db.run(
    "INSERT INTO clientes (nome) VALUES(?)",
    [nome]
    );
    return {
        id:resultado.lastInsertRowid,
        nome
    };
}
    //buscar todos os clientes
function buscarTodosClientes(){
     
     const db = getDb();
     
     const resultado = db.exec(
         "SELECT * FROM clientes",
         );
         if(resultado.length === 0){
             return [];
         }
         
         return resultado[0].values.map((cliente)=>{
             
         return {
             id:cliente[0],
             nome:cliente[1]
         };
         });
         
}
function buscarClientePorId(id){

    const db = getDb();

    const resultado = db.exec(
        "SELECT * FROM clientes WHERE id = ?",
        [id]
    );

    if(resultado.length === 0){
        return null;
    }

    const cliente = resultado[0].values[0];

    return {
        id: cliente[0],
        nome: cliente[1]
    };
}

module.exports = {
    criarCliente,
    buscarTodosClientes,
    buscarClientePorId
};