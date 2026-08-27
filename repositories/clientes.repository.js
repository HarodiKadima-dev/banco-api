const {getDb} = require("../database/database");

//criar
function criarCliente(nome) {
    const db = getDb();

    db.run(
        "INSERT INTO clientes (nome) VALUES(?)",
        [nome]
    );

    const resultado = db.exec(
        "SELECT last_insert_rowid() AS id"
    );

    console.log("RESULTADO DO SQLITE:", resultado);

    const id = resultado[0].values[0][0];

    console.log("ID:", id);

    return {
        id: id,
        nome: nome
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