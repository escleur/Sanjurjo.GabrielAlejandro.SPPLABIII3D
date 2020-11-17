//import {crearTabla} from './tabla.js'
//import Anuncio from "./anuncio.js"
import Anuncio_Mascota from "./anuncio_mascota.js"
//import {Vista} from "./vista.js"


//module.export.listar = listar;
/**
 * Lista todos los registros
 */
function listar(vista){
    const xhr = new XMLHttpRequest();
    vista.mostrarSpin();

    xhr.addEventListener( 'readystatechange', () => {

        if ( xhr.readyState == 4 ) {

            if ( xhr.status >= 200 && xhr.status < 300 ) {

                let data = JSON.parse(xhr.responseText);

                let anuncios = data.map((item)=>{
                    return new Anuncio_Mascota(item.id, item.titulo, item.transaccion, item.descripcion, item.precio, item.animal, item.raza, item.fecha_nacimiento, item.vacuna);
                })
                vista.Lista = anuncios;
                vista.mostrarTabla();
        
            } else { 

                let msg = xhr.statusText || 'Se produjo un error';

                console.warn( `Error: ${ xhr.status } - ${ msg }` );

            }
           
        }
    });
    xhr.open( 'GET', 'http://localhost:3000/anuncio_mascota' );

    xhr.send();
}

/**
 * Alta de un registro
 */
function cargar(vista, dato){
    // spinner.appendChild(crearSpinner());
    const xhr = new XMLHttpRequest();
    delete dato.id;
    vista.mostrarSpin();
    xhr.addEventListener( 'readystatechange', () => {

        if ( xhr.readyState == 4 ) {

            if ( xhr.status >= 200 && xhr.status < 300 ) {

                let data = JSON.parse(xhr.responseText);
                listar(vista);
        
            } else { 

                let msg = xhr.statusText || 'Se produjo un error';

                console.warn( `Error: ${ xhr.status } - ${ msg }` );
            }
        }
    });
    xhr.open( 'POST', 'http://localhost:3000/anuncio_mascota' );
    xhr.setRequestHeader( 'Content-type', 'application/json;charset=utf-8' );

    xhr.send( JSON.stringify(dato));
}


/**
 * Modifica un registro
 */
function modificar(vista, dato){
    // spinner.appendChild(crearSpinner());
    let id = dato.id;
    delete dato.id;
    vista.mostrarSpin();

    fetch("http://localhost:3000/anuncio_mascota/"+id, {
        method:"PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dato)
    })
    .then((res)=>{
        return res.ok? res.text():Promise.reject(res);
    })
    .then((text)=>{
        listar(vista);
    })
    .catch((err)=>{
        console.error('Error al leer los datos');
    })
    .finally(()=>{
    //   spinner.innerHTML = "";
    })
 
 }


 /**
 * borra un registro
 */
async function borrar(vista, id){
    vista.mostrarSpin();
    try {
        const res = await fetch("http://localhost:3000/anuncio_mascota/"+id, {
            method:"DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if(!res.ok){
              
            let msgError = res.statusText || 'Se produjo un error';
            throw { status: res.status, statusText: msgError };
        }
        const data = await res.json();
        listar(vista);
        
    } catch (err) {
        console.log(`Error ${err.status} ${err.statusText}`);
        
    }
 
 }

export {listar, cargar, modificar, borrar}