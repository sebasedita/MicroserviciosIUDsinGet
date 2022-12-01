const {Router} = require('express');
const Etapas = require('../models/Etapas');
const {validarEtapas}=require('../helpers/validar-etapas');

const router = Router()

router.get('/', async function(req,res){
    console.log("Servidor actual : ", process.env.HOST);
    try{
        const etapas = await Etapas.find()
        res.send(etapas)
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error')
    }
    
})

router.get('/:etapasId', async function(req, res){
    try {
        const etapas = await Etapas.findById(req.params.etapasId)
        if (!etapas) {
            return res.status(404).send('Etapas no existe')
                          
        }
        res.send(etapas)
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar las Etapas')
    }
 })


router.post('/', async function(req,res){
    try{
        const validaciones = validarEtapas(req)
        if (validaciones.length > 0) {
            return res.status(400).send(validaciones)
        }
        let etapas = new Etapas()
        etapas.nombre = req.body.nombre
        etapas.estado = req.body.estado
        etapas.fechaCreacion = new Date()
        etapas.fechaActualizacion = new Date()
        etapas=await etapas.save()
        res.send(etapas)
    }catch(error){
        console.log(error);
        res.status(500).send('Ocurrio un error')
    }
})

router.put('/:etapasId', async function(req,res){
    try{
        let etapas = await Etapas.findById(req.params.etapasId)
        if(!etapas){
            return res.send('Etapas no existe')
        }

        etapas.nombre = req.body.nombre
        etapas.estado = req.body.estado        
        etapas.fechaActualizacion = new Date()        
        etapas=await etapas.save()
        res.send(etapas)
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error')
    }
})
module.exports = router