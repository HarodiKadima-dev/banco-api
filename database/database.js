const initSqlJs = require("sql.js");

let db;
 async function conectarBanco(){
     
     const SQL = await initSqlJs();
     
     db = new SQL.Database();
     
     db.run("PRAGMA foreign_keys = ON");
     
     db.run(
         `CREATE TABLE clientes(
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             nome TEXT NOT NULL)`);
     
     db.run(`CREATE TABLE contas(
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     saldo REAL NOT NULL CHECK (saldo >=0 ),
     cliente_id INTEGER NOT NULL,
     FOREIGN KEY (cliente_id)
     REFERENCES clientes(id)) `);
     
     db.run(
         `CREATE TABLE transferencias(
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             conta_origem_id INTEGER NOT NULL,
             conta_destino_id INTEGER NOT NULL,
             valor REAL NOT NULL,
             created_at TEXT DEFAULT CURRENT_TIMESTAMP,
             
            FOREIGN KEY(conta_origem_id)
            REFERENCES contas(id),
            FOREIGN KEY(conta_destino_id)
            REFERENCES contas(id))`
            );

     db.run(
         `CREATE TABLE usuarios(
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             email TEXT NOT NULL UNIQUE,
             senha TEXT NOT NULL,
             cliente_id INTEGER NOT NULL,
             FOREIGN KEY(cliente_id)
             REFERENCES clientes(id))`
         );
     console.log("Banco SQLite iniciado");
    
 }
     function getDb(){
         return db;
 }
 
 module.exports = {
     conectarBanco,
 getDb
 };