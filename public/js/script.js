//json-server -d 1000 --watch db.json

import {obtenerAnuncio, onCambioId} from './frmcontroler.js'
import {listar, cargar, modificar, borrar} from './conexion.js'
import {Vista} from './vista.js'

Array.prototype.unique = function(){return [...new Set(this)]};

let vista;
let frm;


window.addEventListener('load', inicializarManejadores);

function inicializarManejadores(){
   
    vista = new Vista(document.getElementById('divTabla'),document.getElementById('divFiltros'));
    listar(vista);

    frm = document.forms[0];
    onCambioId(frm);
    frm.cancelar.addEventListener('click', e=>{
        frm.id.value = '';
        onCambioId(frm);
    })
    frm.addEventListener('submit', e=>{
        e.preventDefault();
        //----------------Alta-----------------
        if(e.submitter.id == "alta"){
            const nuevoAnuncio = obtenerAnuncio(0,frm);
            if(nuevoAnuncio){
                cargar(vista, nuevoAnuncio);
                frm.reset();
            }

        }
        //----------------Modificacion-----------------
        if(e.submitter.id == "modificar"){
            const nuevoAnuncio = obtenerAnuncio(Number(frm.id.value), frm);
            console.log(nuevoAnuncio);
            modificar(vista, nuevoAnuncio);
            frm.reset();
            frm.id.value = '';
            onCambioId(frm);
        }
        //----------------Baja-----------------
        if(e.submitter.id == "baja"){
            const id = Number(frm.id.value);
            borrar(vista, id);
            frm.reset();
            frm.id.value = '';
            onCambioId(frm);
        }
        
    })

}


