import Anuncio from "./anuncio.js"
import Anuncio_Macota from "./anuncio_mascota.js"



function obtenerAnuncio(proximoId, frm){
    const nuevoAnuncio = new Anuncio_Macota(proximoId, frm.titulo.value, 'venta'
    ,  frm.descripcion.value, frm.precio.value, frm.animal.value, frm.raza.value
    , frm.fecha.value, frm.vacuna.value);
    return nuevoAnuncio;    
}


function mostrarAnuncio(anuncio){

    const frm = document.forms[0];
    frm.id.value = anuncio.id;
    frm.titulo.value = anuncio.titulo;
    frm.descripcion.value = anuncio.descripcion;
    frm.precio.value = anuncio.precio;
    frm.animal.value = anuncio.animal;
    frm.raza.value = anuncio.raza;
    frm.fecha.value = anuncio.fecha_nacimiento
    frm.vacuna.value = anuncio.vacuna;
    onCambioId(frm);
}


function onCambioId(frm){
    if(frm.id.value == ''){
        frm.alta.hidden = false;
        frm.modificar.hidden = true;
        frm.baja.hidden = true;
        frm.cancelar.hidden = false;

    }else{
        console.log(frm.alta);
        frm.alta.hidden = true;
        frm.modificar.hidden = false;
        frm.baja.hidden = false;
        frm.cancelar.hidden = false;

    }
}

export {obtenerAnuncio, mostrarAnuncio, onCambioId}