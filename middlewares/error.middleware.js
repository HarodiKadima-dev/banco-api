function errorMiddleware(error,req,res, next){
    console.log(error.message);
     const status = error.status || 500;
     
    res.status(status).json({
        mensagem:error.message
    });
}

module.exports = errorMiddleware;