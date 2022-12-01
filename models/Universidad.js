const {Schema,model} = require('mongoose')

const UniversidadSchema = Schema({
    nombre:{
        type:String,
        required:true
    },
    direccion:{
        type:String,
        required:true
    },
    telefono:{
        type:String,
        required:true
    },
    estado:{
        type:String,
        required:true,
        enum:['Activo','Inactivo']
    },
    fechaCreacion:{
        type:Date,
        required:true
    },
    fechaActualizacion:{
        type:Date,
        required:true
    }

}) 

module.exports = model('Universidad',UniversidadSchema)
