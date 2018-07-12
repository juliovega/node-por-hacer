const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile("db/data.json", data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = []
    }

    // console.log(listadoPorHacer);
}

const crear = (descripcion) => {
    let porHacer = {
        descripcion,
        completado: false
    };
    cargarDB();
    listadoPorHacer.push(porHacer);

    guardarDB();
    return porHacer;

}

const getListado = (completado) => {
        cargarDB();
        console.log(`completado ${completado}`);
        listadoNvo = listadoPorHacer.filter(tarea => {
            // console.log(`tarea.completado: ${tarea.completado}, tarea.descripcion: ${tarea.descripcion}`);
            // console.log("typeof tarea.completado", typeof tarea.completado);
            // console.log("type of completado", typeof eval(completado))
            // console.log(tarea.completado === eval(completado))
            tarea.completado === completado
        });
        console.log(listadoNvo.length);
        return listadoNvo;
    }
    // const getListado = (completado) => {
    //     cargarDB();
    //     if (completado === 'true') {
    //         console.log("completado true");
    //         let nuevolistadoT = listadoPorHacer.filter(tarea => {
    //             return tarea.completado === completado;
    //         });
    //         return nuevolistadoT;
    //     }
    //     if (completado === 'false') {
    //         console.log("completado true");

//         let nuevoListadoF = listadoPorHacer.filter(tarea => {
//             return tarea.completado === eval(completado);
//         });
//         return nuevoListadoF;
//     }
// }


const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea =>
        tarea.descripcion === descripcion
    );
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }
    return false;
}

const borrar = (descripcion) => {
    cargarDB();
    let listadoPorHacerNvo = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    if (listadoPorHacer.length === listadoPorHacerNvo.length) {
        return false;
    }
    listadoPorHacer = listadoPorHacerNvo;
    guardarDB();
    return true;

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}