
const { request, response } = require('express');
const Universidad = require('../models/Universidad');
const Cliente = require('../models/cliente');

/**
 * Consultar Universidad activos con usuario activo
 */
const getUniversidadUserActivo = async (req, res = response) => {
    const query = { estado: true}; // Universidad
    let universidadBD = await Universidad.find(query).populate({
        path: 'cliente',
        match: { estado: true }
    });
    universidadBD = universidadBD.filter(t => t.cliente != null);
    res.json(universidadBD);
}

/**
 * Consultar un tipo de equipo por Id
 */
const getUniversidadById = async (req = request, res = response) => {
    try{
        const id  = req.params.id;
        console.log(id)
        const query = { _id: id };
        const universidad = await Universidad.findOne(query);
        res.json(universidad);
    }catch(e){
        return res.status(500).json({msg: e});
    }
}

/**
 * Actualiza una Universidad por su ID
 */
const updateUniversidadById = async (req = request, res = response) => {
    const { id } = req.params;
    const { nombre, ...data } = req.body;// destructuring, spread (...)
    const clienteBD = await Cliente.findOne( { email: data.cliente.email });
    if(!clienteBD){
      return res.status(404).json({msg: 'No existe cliente'});   
    }
    data.cliente = clienteBD._id;
    const universidad = await Universidad.findByIdAndUpdate(id, data, {new : true});
    res.status(201).json(universidad);
}

/**
 * Borrar Universidad por su ID
 */
const deleteUniversidadByID = async (req = request, res = response) => {
    // try- catch
    const id = req.params.id;
    const universidad = await Universidad.findByIdAndDelete(id);
    res.status(204).json(universidad);
}

/**
 * Consulta todas las Universidades
 */
const getUniversidad = async (req, res = response) => {
    const query = {};    
    const universidadBD = await Universidad.find(query);
    res.json(universidadBD);
}

/**
 * crea un tipo de eqipo
 */
const createUniversidad = async (req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const email = req.body.cliente.email;
    const universidadBD = await Universidad.findOne({ nombre });
    if(universidadBD){// ya existe Universidad
        return res.status(400).json({msg: 'Ya existe Universidad'});
    }
    const clienteBD = await Cliente.findOne({ email });
    if(!clienteBD){// no existe Universidad
        return res.status(404).json({msg: 'No existe Universidad'});
    }
    const datos = {
        nombre,
        cliente: clienteBD._id
    };
    const universidad = new Universidad(datos); 
    await universidad.save();
    res.status(201).json(universidad);
}

module.exports = { getUniversidad, getUniversidadUserActivo, createUniversidad, getUniversidadById, updateUniversidadById, deleteUniversidadByID};