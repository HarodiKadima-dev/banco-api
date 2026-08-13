const {getDb} = require("./database");

function iniciarTransacao(){
    
    const db = getDb();
    
    db.run("BEGIN TRANSACTION");
}

function confirmarTransacao(){
    
    const db = getDb();
    
    db.run("COMMIT");
}

function desfazerTransacao(){
    
    const db = getDb();
    
    db.run("ROLLBACK");
}

module.exports = {
    iniciarTransacao,
    confirmarTransacao,
    desfazerTransacao
}