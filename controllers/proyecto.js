
const { request, response } = require('express');
const Proyecto = require('../models/Proyecto');
const Cliente = require('../models/Cliente');

const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

/**
 * Consultar todos los Proyectos
 */
const getProyecto = async (req, res = response) => {
    try{
        const query = {};
        const proyectoBD = await Proyecto.find(query);
        res.json(proyectoBD);
    }catch(e){
        return res.status(500).json({
            error: e
        })
    }
}

/**
 * Consultar todos los Proyectos
 */
 const getProyectoByID = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const query = { _id: id};
        const proyectoBD = await Proyecto.findOne(query);
        // TODO: personalizar error de no encontrado
        res.json(proyectoBD);
    }catch(e){
        return res.status(500).json({
            error: e
        })
    }
}

/**
 * crea un Proyecto
 */
 const createProyecto = async (req = request, res = response) => {
    try{
        const { numero, titulo, fechainiciacion, fechaentrega, valor, cliente, etapas, tipoproyecto, universidad } = req.body;

        const proyectoBD = await Proyecto.findOne({
            $or: [
                {numero}, {titulo}, {valor}
            ]
        });
        if(proyectoBD){
            return res.status(400).json({
                msj: 'Ya existe numero o titulo, etc...'
            })
        }
        const clienteBD = await Cliente.findOne({
            _id: cliente, estado: true
        })
        if(!clienteBD){
            return res.status(400).json({
                msj: 'No existe cliente'
            })
        }
        const etapasBD = await Etapas.findOne({
            _id: etapas, estado: true
        })
        if(!etapasBD){
            return res.status(400).json({
                msj: 'No existe etapas'
            })
        }
        const tipoproyectoBD = await TipoProyecto.findOne({
            _id: tipoproyecto, estado: true
        })
        if(!tipoproyectoBD){
            return res.status(400).json({
                msj: 'No existe tipoproyecto'
            })
        }
        const universidadBD = await Universidad.findOne({
            _id: universidad, estado: true
        })
        if(!universidadBD){
            return res.status(400).json({
                msj: 'No existe universidad'
            })
        }
        
        // TAREA: Validar que etapas, tipoproyecto, universidad y si estén activos

        const data = req.body;

        const proyecto = new Proyecto(data);
        await proyecto.save();
        res.status(201).json(proyecto);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}

const updateProyecto = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const data = req.body;// destructuring, spread (...)
    
        const proyectoBD = await Proyecto.findOne({ _id: id});
       // TODO: VALIDAR QUE EXISTEN Y ESTAN ACTIVOS: ETAPAS, CLIENTE, UNIVERSIDAD, ...
       if(!proyectoBD){
        return res.status(400).json({
            msj: 'No existe este Proyecto'
        });
       } 
        const proyecto = await Proyecto.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(proyecto);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}

module.exports = { getProyecto, getProyectoByID, createProyecto, updateProyecto };