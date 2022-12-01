const {Router} = require('express');
const TipoProyecto = require('../models/TipoProyecto');
const {validarTipoProyecto} = require('../helpers/validar-tipoproyecto');
const router = Router();


router.get('/', async function(req,res){
    console.log("Servidor actual : ", process.env.HOST);
    try{
        const tipoproyecto = await TipoProyecto.find()
        res.send(tipoproyecto)
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error')
    }

});
router.post('/', async function(req,res){
    try{
        const validaciones = validarTipoProyecto(req)
        if (validaciones.length > 0) {
            return res.status(400).send(validaciones)
        }
        let tipoproyecto = new TipoProyecto();
        tipoproyecto.nombre = req.body.nombre
        tipoproyecto.estado = req.body.estado
        tipoproyecto.fechaCreacion = new Date()
        tipoproyecto.fechaActualizacion = new Date()
        tipoproyecto = await tipoproyecto.save()   
        res.send(tipoproyecto)
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error')
    }
});
router.put('/:tipoproyectoId', async function(req,res){
    try{
        let tipoproyecto = await TipoProyecto.findById(req.params.tipoproyectoId)
        if(!tipoproyecto){
            return res.send('No existe Tipo Proyecto')
        }
        tipoproyecto.nombre = req.body.nombre
        tipoproyecto.estado = req.body.estado
        tipoproyecto.fechaActualizacion = new Date()
        tipoproyecto = await tipoproyecto.save()   
        res.send(tipoproyecto)
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error')
    }
});

router.get('/:tipoproyectoId', async function(req, res){
    try {
        const tipoproyecto = await TipoProyecto.findById(req.params.tipoproyectoId)
        if (!tipoproyecto) {
            return res.status(404).send('Tipo Proyecto no existe')
                          
        }
        res.send(tipoproyecto)
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar Estado Equipo')
    }
 });

module.exports = router