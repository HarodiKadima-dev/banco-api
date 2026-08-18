require("dotenv").config();

const express = require("express");
const {conectarBanco} = require("./database/database");

const app = express();

app.use(express.json());


// routes
const contasRoutes = require("./routes/contas.routes");
const clientesRoutes = require("./routes/clientes.routes");
const transferenciaRoutes = require("./routes/transferencias.routes");
const usuariosRoutes = require("./routes/usuarios.routes");


// middlewares
const logMiddleware = require("./middlewares/log.middleware");
const errorMiddleware = require("./middlewares/error.middleware");


// middleware de log
app.use(logMiddleware);


// rotas
app.use(contasRoutes);
app.use(clientesRoutes);
app.use(transferenciaRoutes);
app.use(usuariosRoutes);


// sempre por último
app.use(errorMiddleware);



async function iniciarServidor(){

    await conectarBanco();

    app.listen(3000, ()=> {
        console.log("Servidor iniciado com sucesso - com gitHub");

    });

}


iniciarServidor();
