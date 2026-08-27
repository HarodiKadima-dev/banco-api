require("dotenv").config();

const express = require("express");
const cors = require("cors");
const {conectarBanco} = require("./database/database");
const app = express();

app.use(express.json());
app.use(cors());
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

console.log("ROTAS CARREGADAS");
console.log(app._router.stack
    .filter(r => r.route)
    .map(r => ({
        method: Object.keys(r.route.methods),
        path: r.route.path
    }))
);
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});

}

iniciarServidor();
