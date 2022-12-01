const { request, response } = require('express');
const Etapas = require('../models/Etapas');

/**
 * Consultar todas las Etapas activos
 */
const getEtapas = async (req, res = response) => {
    try{
        const query = { estado: true};
        const etapasBD = await Etapas.find(query);
        res.json(etapasBD);
    }catch(e){
        return res.status(500).json({
            error: e
        })
    }
}

/**
 * Consultar las Etapas por Id
 */
const getEtapasById = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const query = { estado: true, _id: id}; 
        const etapasBD = await Etapas.findOne(query);
        res.json(etapasBD);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}

/**
 * crea las Etapas
 */
 const createEtapas = async (req = request, res = response) => {
    try{
        const nombre = req.body.nombre.toUpperCase();
        const etapasBD = await Etapas.findOne({ nombre });
        if(etapasBD){
            return res.status(400).json({msg: 'Ya existe las Etapas'});
        }
        const datos = {
            nombre
        };
        const etapas = new Etapas(datos); 
        await etapas.save();
        res.status(201).json(etapas);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}

/**
 * Actualiza una de las Etapas por su ID
 */
const updateEtapasById = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const { nombre, ...data } = req.body;// destructuring, spread (...)
    
        const etapasBD = await Etapas.findOne({ _id: id });
    
        if(!etapasBD){
            return res.status(404).json({
                msj: 'No existe las Etapas'
            });
        }
        data.fechaCreacion = etapasBD.fechaCreacion;
        data.fechaActualizacion = new Date();
        const etapas = await Etapas.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(etapas);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}


module.exports = { getEtapas, getEtapasById, createEtapas, updateEtapasById};