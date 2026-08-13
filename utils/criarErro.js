function criarErro(mensagem, status){
    const error = new Error(mensagem);
    
    error.status= status;
    
    throw error;
}

module.exports = criarErro;