const jwt = require("jsonwebtoken");
const criarErro = require("../utils/criarErro");

function autenticar(req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return criarErro("Token não autorizado",401);
    
    }
    
    const token = authHeader.split(" ")[1]
    try{
    const dados = jwt.verify(
        token,
        //chave (para recordar)
        process.env.JWT_SECRET
        );
        
        req.usuario = dados;
        next();
    }catch(error){
        return criarErro("Token inválido",401);
    } 
    
}

module.exports = autenticar;