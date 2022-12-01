require ("dotenv").config();
const express = require("express");
const dbConnect = require('./db/db-connection-mongo.js');
const cors = require("cors")
const path = require('path');
const dotenv = require('dotenv').config();

const app = express ();
const PORT = process.env.port || 7000;
app.set ('views', path.join(__dirname, 'views'));



//Implementado Cors
app.use (cors())

//middlewares
app.use(express.urlencoded({extended: false}));

// Parseo JSON
app.use(express.json());

app.use('/Cliente', require('./router/cliente'));
app.use('/TipoProyecto', require('./router/tipoproyecto'));
app.use('/Etapas', require('./router/etapas'));
app.use('/Universidad', require('./router/universidad'));
app.use('/Proyecto', require('./router/proyecto'));


app.listen(PORT, () => {
    console.log(`Conexion establecida en ${PORT}`);
});

dbConnect();

