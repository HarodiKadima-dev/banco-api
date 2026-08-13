const usuarioService = require("../services/usuarios.services");

function login(req, res, next){
    try{
    const {email, senha} = req.body;
    
    const resultado = usuarioService.login(
        email,
        senha
        )
        res.json(resultado);
        
    }catch(error){
        next(error);
    }
        
}
function criarUsuario(req, res, next){
    try{
        const {email, senha, cliente_id} = req.body;

        const usuario = usuarioService.criarUsuario(
            email,
            senha,
            cliente_id
        );

        res.status(201).json({
            mensagem: "Usuário criado com sucesso",
            usuario
        });

    }catch(error){
        next(error);
    }
}

module.exports = {
    login,
    criarUsuario
}