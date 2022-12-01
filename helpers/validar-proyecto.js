const validarProyecto = (req) => {
    const validaciones = []
    if(!req.body.numero){
        validaciones.push('Numero es Requerido')
    }
    if(!req.body.titulo){
        validaciones.push('Titulo es Requerido')
    }
    if(!req.body.fechainiciacion){
        validaciones.push('FechaIniciacion es Requerido')
    }
    if(!req.body.fechaentrega){
        validaciones.push('FechaEntrega es Requerida')
    }
    if(!req.body.valor){
        validaciones.push('Valor es Requerido')
    }
    if(!req.body.cliente){
        validaciones.push('Cliente es Requerido')
    }
    if(!req.body.etapas){
        validaciones.push('Etapas es Requerido')
    }
    if(!req.body.tipoproyecto){
        validaciones.push('Tipo de Proyecto es Requerido')
    }
    if(!req.body.universidad){
        validaciones.push('Universidad es Requerido')
    }

    return validaciones
}

module.exports = {
    validarProyecto
}