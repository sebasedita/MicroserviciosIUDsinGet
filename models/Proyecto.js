const {Schema,model} = require('mongoose')

const ProyectoSchema = Schema({
    numero:{
        type:String,
        required:true,
        unique:true
    },
    titulo:{
        type:String,
        required:true
    },
    fechainiciacion:{
        type:String,
        required:true
    },
    fechaentrega:{
        type:String,
        required:true
    },
    valor:{
        type:String,
        required:true
    },
    cliente:{
        type:Schema.Types.ObjectId,
        ref:'Cliente',
        required:false
    },
    etapas:{
        type:Schema.Types.ObjectId,
        ref:'Etapas',
        required:true        
    },
    tipoproyecto: {
        type: Schema.Types.ObjectId,
        ref:'TipoProyecto',
        required:true
    },
    universidad:{
        type:Schema.Types.ObjectId,
        ref:'Universidad',
        required: true
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

module.exports = model('Proyecto', ProyectoSchema)