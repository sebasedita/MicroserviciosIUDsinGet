const {Router} = require('express')
const router = Router()
const {validarCliente}=require('../helpers/validar-cliente')
const Cliente = require('../models/Cliente')


router.post('/', async function(req,res){
    try{
    const validaciones = validarCliente(req)
    if (validaciones.length > 0) {
        return res.status(400).send(validaciones)
    }
    console.log('Archivo recibido', req.body);

    const existeCliente = await Cliente.findOne({email: req.body.email})
    if(existeCliente){
        return res.send('El email ya existe')
    }

    let cliente = new Cliente();
    cliente.nombre = req.body.nombre;
    cliente.email = req.body.email;
    cliente.estado = req.body.estado;
    cliente.fechaCreacion = new Date();
    cliente.fechaActualizacion = new Date()
    cliente = await cliente.save()
    res.send(cliente)
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error')
    }
})


router.get('/', async function(req,res){
    console.log("Servidor actual : ", process.env.HOST);
    try{
        const cliente = await Cliente.find()
        res.send(cliente)
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error')

    }

})

router.get('/:clienteId', async function(req, res){
    try {
        const cliente = await Cliente.findById(req.params.clienteId)
        if (!cliente) {
            return res.status(404).send('Cliente no existe')
                          
        }
        res.send(cliente)
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar al cliente')
    }
 })

router.put('/:clienteId', async function(req,res){
    try{
        console.log('Archivo recibido', req.body, req.params);

        let cliente = await Cliente.findById(req.params.clienteId)
        if (!cliente) {
            return res.send('Cliente no existe');
        }

        const existeCliente = await Cliente
        .findOne({email: req.body.email, _id: { $ne: cliente._id }})
        console.log('Respuesta existe cliente', existeCliente);

        if (existeCliente) {
            return res.send('Email ya existe')
        }

    
        cliente.email = req.body.email
        cliente.nombre = req.body.nombre
        cliente.estado = req.body.estado
        cliente.fechaActualizacion = new Date()
                  
        cliente = await cliente.save()
        res.send(cliente)
        }catch(error){
            console.log(error);
            res.send('Ocurrio un error')
        }
})

module.exports = router