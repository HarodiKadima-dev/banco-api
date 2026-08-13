const  usuarioRepository = require("../repositories/usuarios.repository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const criarErro = require("../utils/criarErro");

//verificar o email se existe
function criarUsuario(email, senha, cliente_id){
    
    const usuarioExistente = usuarioRepository.buscarUsuarioPorEmail(email);
    
    if(usuarioExistente){
        criarErro("Email já cadastrado",400);
    }
    //
    const senhaHash = bcrypt.hashSync(senha,10);
    
    return usuarioRepository.criarUsuario(
        email,
        senhaHash,
        cliente_id
        );
}

function login(email, senha){
    
    const usuario = usuarioRepository.buscarUsuarioPorEmail(email);
    
    if(!usuario){
     criarErro("Usuário não encontrado",404);
}

      const senhaValida = bcrypt.compareSync(
        senha,
        usuario.senha
     );
     
      if(!senhaValida){
     criarErro("Senha inválida",401);
 }
 
 const token = jwt.sign(
     {
         id:usuario.id,
         email:usuario.email,
         cliente_id:usuario.cliente_id
     },
     //chave (para recordar)
     process.env.JWT_SECRET
     );
 
return {
    usuario:{
    id: usuario.id,
    email: usuario.email,
    cliente_id: usuario.cliente_id
    },
    token
};
}
module.exports = {
    criarUsuario,
    login
}