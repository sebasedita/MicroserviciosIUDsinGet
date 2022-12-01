const {Router} = require('express');
const Proyecto = require('../models/Proyecto');
const {validarProyecto} = require('../helpers/validar-proyecto');
const {validaciones} = require('express-validator');
const moment = require('moment');


const router = Router()

router.post('/', async function(req,res){
    try{
        const validaciones = validarProyecto(req)
        if (validaciones.length > 0) {
            return res.status(400).send(validaciones)
        }
        const existeProyectoPorNumero = await Proyecto.findOne({numero:req.body.numero}) 
        if (existeProyectoPorNumero) {
            return res.status(400).send('Ya existe el numero')
        }
        let proyecto = new Proyecto()
        proyecto.numero =req.body.numero
        proyecto.titulo = req.body.titulo
        proyecto.fechainiciacion = req.body.fechainiciacion
        proyecto.fechaentrega = req.body.fechaentrega
        proyecto.valor = req.body.valor
        proyecto.cliente = req.body.cliente._id
        proyecto.etapas = req.body.etapas._id
        proyecto.tipoproyecto = req.body.tipoproyecto._id
        proyecto.universidad = req.body.universidad._id
        proyecto.fechaCreacion = new Date()
        proyecto.fechaActualizacion = new Date()

        proyecto = await proyecto.save()
        res.send(proyecto)

     }catch(error){
         console.log(error);
         res.status(500).send('ocurrio un error')
     }
});
router.put('/:proyectoId', async function(req,res){
    try{
        let proyecto = await Proyecto.findById(req.params.proyectoId)
        if (!proyecto) {
            return res.status(400).send('Ya existe el numero para otro cliente')
        }
        const existeProyectoPorNumero = await Proyecto
            .findOne({numero:req.body.numero, _id:{$ne: proyecto._id}})
        if (existeProyectoPorNumero) {
            return re.status(400).send('Ya existe el numero para otro cliente')
        }

        proyecto.numero =req.body.numero
        proyecto.titulo = req.body.titulo
        proyecto.fechainiciacion = req.body.fechainiciacion
        proyecto.fechaentrega = req.body.fechaentrega
        proyecto.valor = req.body.valor
        proyecto.cliente = req.body.cliente._id
        proyecto.etapas = req.body.etapas._id
        proyecto.tipoproyecto = req.body.tipoproyecto._id
        proyecto.universidad = req.body.universidad._id        
        proyecto.fechaActualizacion = new Date()

        proyecto = await proyecto.save()
        res.send(proyecto)

     }catch(error){
         console.log(error);
         res.status(500).send('ocurrio un error')
     }});

 
module.exports = router