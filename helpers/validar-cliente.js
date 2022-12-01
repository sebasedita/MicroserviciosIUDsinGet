const validarCliente = (req) => {
    const validaciones = []
    if(!req.body.nombre){
        validaciones.push('Nombre es Requerido')
    }
    if(!req.body.email){
        validaciones.push('Email es Requerido')
    }
    if(!req.body.estado){
        validaciones.push('Estado es Requerido')
    }
   

    return validaciones
}

module.exports = {
    validarCliente
}