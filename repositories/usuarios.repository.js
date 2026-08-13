const {getDb} = require("../database/database");

// criar usuário
function criarUsuario(email, senha, cliente_id){

    const db = getDb();

    const resultado = db.run(
        "INSERT INTO usuarios(email, senha, cliente_id) VALUES(?,?,?)",
        [email, senha, cliente_id]
    );

    return {
        id: resultado.lastInsertRowid,
        email,
        senha,
        cliente_id
    };
}


// buscar por email
function buscarUsuarioPorEmail(email){

    const db = getDb();

    const resultado = db.exec(
        "SELECT * FROM usuarios WHERE email = ?",
        [email]
    );

    if(resultado.length === 0){
        return null;
    }

    const usuario = resultado[0].values[0];

    return {
        id: usuario[0],
        email: usuario[1],
        senha: usuario[2],
        cliente_id: usuario[3]
    };
}


module.exports = {
    criarUsuario,
    buscarUsuarioPorEmail
};