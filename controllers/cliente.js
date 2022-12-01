const { request, response } = require('express');
const Cliente = require('../models/Cliente');

/**
 * Consultar todos los Clientes activos
 */
 const getClientes = async (req, res = response) => {
    try{
        const query = { estado: true};
        const clientesBD = await Cliente.find(query);
        res.json(clientesBD);
    }catch(e){
        return res.status(500).json({
            error: e
        })
    }
}

const createUsuario = async (req = request, res = response) => {
    try{
        const body = req.body;
        const cliente = new Cliente( body )
        await cliente.save();
        res.json(cliente);
    }catch(e){
        return res.status(500).json({error: e});
    }
}

module.exports = { getClientes, createCliente };