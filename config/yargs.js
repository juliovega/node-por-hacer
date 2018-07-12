const descripcion = {
    demand: true,
    alias: 'd'
}

const completado = {
    default: true,
    alias: 'c'
}

const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        completado,
        descripcion
    }).command('borrar', 'Borra el elemento por hacer', {
        descripcion
    }).command('listar', 'Lista todas las tareas', {
        completado
    }).options({
        completado: {
            type: 'boolean'
        }
    })
    .help().argv;

module.exports = {
    argv
}