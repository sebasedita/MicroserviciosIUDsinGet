
const { request, response } = require('express');
const TipoProyecto = require('../models/TipoProyecto');

/**
 * Consultar todos proyectos activos
 */
const getTipoProyecto = async (req, res = response) => {
    try{
        const query = { TipoProyecto: true}; // Tipo Proyecto
        const TipoProyectoBD = await TipoProyecto.find(query);
        res.json(TipoProyectoBD);
    }catch(e){
        return res.status(500).json({
            error: e
        })
    }
}

/**
 * Consultar un ESTADO por Id
 */
const getTipoProyectoById = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const query = { TipoProyecto: true, _id: id}; 
        const TipoProyectoBD = await TipoProyecto.findOne(query);
        res.json(TipoProyectoBD);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}

/**
 * crea un estado
 */
 const createTipoProyecto = async (req = request, res = response) => {
    try{
        const nombre = req.body.nombre.toUpperCase();
        const TipoProyectoBD = await TipoProyecto.findOne({ nombre });
        if(TipoProyectoBD){
            return res.status(400).json({msg: 'Ya existe Tipo Proyecto'});
        }
        const datos = {
            nombre
        };
        const TipoProyecto = new TipoProyecto(datos); 
        await TipoProyecto.save();
        res.status(201).json(TipoProyecto);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}

/**
 * Actualiza un estado por su ID
 */
const updateTipoProyectoById = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const { nombre, ...data } = req.body;// destructuring, spread (...)
    
        const TipoProyectoBD = await TipoProyecto.findOne({ _id: id });
    
        if(!TipoProyectoBD){
            return res.status(404).json({
                msj: 'No existe Tipo Proyecto'
            });
        }
        data.fechaCreacion = TipoProyectoBD.fechaCreacion;
        data.fechaActualizacion = new Date();
        const estado = await Estado.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(estado);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}


module.exports = { getTipoProyecto, getTipoProyectoById, createTipoProyecto, updateTipoProyectoById };