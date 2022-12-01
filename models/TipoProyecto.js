const {Schema, model} = require('mongoose')

const TipoProyectoSchema = Schema({
    nombre:{
        type:String,
        required:true
    },
    estado:{
        type:String,
        required:true,
        enum: [
            'Excelente', 'Deficiente'
        ]
    },
    fechaCreacion:{
        type:Date,
        required:true,
        
    },
    fechaActualizacion:{
        type:Date,
        required:true,

    }

})

module.exports = model('TipoProyecto',TipoProyectoSchema)