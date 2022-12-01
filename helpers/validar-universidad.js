const validarUniversidad = (req) => {
    const validaciones = []
    if(!req.body.nombre){
        validaciones.push('Nombre es Requerido')
    }
    if(!req.body.direccion){
        validaciones.push('Direccion es Requerido')
    }
    if(!req.body.telefono){
        validaciones.push('Telefono es Requerido')
    }
    if(!req.body.estado){
        validaciones.push('Estado es Requerido')
    }
   

    return validaciones
}

module.exports = {
    validarUniversidad
}