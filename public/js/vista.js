import {crearTabla, crearFiltro} from './tabla.js'
/**
 * Controla la vista de la tabla y los filtros
 */
class Vista{
    constructor(divTabla, divFiltros){
        this.divTabla = divTabla;
        this.divFiltros = divFiltros;
        this.lista = {};
        this.inicializar = true;
    }
    set Lista(lista){
        this.lista = lista;
    }
    mostrarSpin(){
        vaciarElemento(this.divTabla);
        insertarSpinner(this.divTabla);
    }

    mostrarTabla(){
        vaciarElemento(this.divTabla);
        this.inicializarVista();
        this.divTabla.appendChild(crearTabla(this, filtrarLista(filtroCalcular(filtrarFilas(this.lista)))));

    }

    inicializarVista(){
        if(this.inicializar){
            this.divFiltros.appendChild( crearFiltro(this));
            this.inicializar = false;
        }
    }
}
/**
 * Calcula el promedio de los precios
 * @param {*} lista 
 */
function filtroCalcular(lista){
    let res = document.getElementById("txtResultadoFiltro");
    if(lista.length > 0)
        res.value = lista.reduce((ac, cv)=>Number(ac)+Number(cv.precio),0)/lista.length;
    else
        res.value = "0";

    return lista;
}
/**
 * Filtra la lista por filas segun se eligio perro gato o todos
 * @param {*} lista 
 */
function filtrarFilas(lista){
    let retorno = [];
    let filtro = document.getElementById("selectfila").value;
    retorno = lista.filter(row => {
        if(filtro == 'todos')
            return true;
        return row.animal == filtro;
    });
    return retorno;
}

/**
 * Filtra la lista por columna
 * @param {*} lista 
 */
function filtrarLista(lista){

    let retorno = [];
    
    retorno = lista.map(row => {
        let fila = {};
        for (const key in row) {
            if(document.getElementById("check" + key).checked){
                fila[key] = row[key];
            }else if(key == "id"){
                fila['noid'] = row[key];
            }
        }
        return fila;        
    });
    return retorno;
}   

function vaciarElemento(elemento){
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
      }
}
function insertarSpinner(elemento){
    const div = document.createElement('div');
    div.setAttribute('align', 'center')
    
    const img = document.createElement('img');
    img.className = 'spin';
    img.setAttribute("src", "./../img/spinner.gif");
    img.setAttribute("alt", "Spinner");
    div.appendChild(img);

    elemento.appendChild(div);
}
export {Vista};