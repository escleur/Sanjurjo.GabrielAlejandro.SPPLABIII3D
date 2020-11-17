import { mostrarAnuncio } from "./frmcontroler.js";

/**
 * Crea la tabla que se va a mostrar en pantalla
 * @param {*} vista 
 * @param {*} lista 
 */
function crearTabla(vista, lista){
    const tabla = document.createElement('table');
    tabla.classList.add("table");
    tabla.classList.add("table-stripped");
    tabla.classList.add("table-bordered");
    tabla.classList.add("table-sm");

    
    tabla.appendChild(crearCabecera(lista[0]));
    tabla.appendChild(crearCuerpo(vista, lista));

    return tabla;
}
/**
 * Crea la cabecera de la tabla
 * @param {*} item 
 */
function crearCabecera(item){
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    for(const key in item){
        if(key != "noid"){//si el id esta oculto se llama noid
            const th = document.createElement('th');
            const texto = document.createTextNode(key);
            th.appendChild(texto);
            tr.appendChild(th);

        }
    }
    thead.appendChild(tr);
    return thead;

}

/**
 * Crea el cuerpo de la tabla
 * @param {*} vista 
 * @param {*} lista 
 */
function crearCuerpo(vista, lista){
    const tbody = document.createElement('tbody');

    lista.forEach(element => {
        const tr = document.createElement('tr');
        for (const key in element) {
            if(key != "noid"){//si el id esta oculto se llama noid
                const td = document.createElement('td');
                const texto = document.createTextNode(element[key]);
                td.appendChild(texto);
                tr.appendChild(td);  

            }

        }
        if(element.hasOwnProperty('id')){
            tr.setAttribute('data-id', element['id']);
        }else if(element.hasOwnProperty('noid')){
            tr.setAttribute('data-id', element['noid']);

        }
        agregarManejadorTR(tr, vista);
        tbody.appendChild(tr);
    });
    return tbody;
}
/**
 * agrega evento a las filas de la tabla
 * @param {*} tr 
 * @param {*} vista 
 */
function agregarManejadorTR(tr, vista){
    if(tr){
        tr.addEventListener("click", function(e){
            
            mostrarAnuncio(
                (vista.lista.filter((el) => el.id == e.target.parentNode.dataset.id ))[0]
            );
        })

    }
}

/**
 * crea la inteface con los checkbox para filtar las columnas
 * @param {*} vista 
 */
function crearFiltroColumna(vista){
   
    const lista = vista.lista;
    //<div class="row">

    // <div class="form-check col-sm-6 col-md-2">
    //   <input class="form-check-input" type="checkbox" value="id" id="Check1">
    //   <label class="form-check-label" for="Check1">
    //     id
    //   </label>
    // </div>


    const row = document.createElement('div');
    row.classList.add("row");

    for(const key in lista[0]){
        const formcheck = document.createElement('div');
        formcheck.classList.add("form-check");
        formcheck.classList.add("col-sm-6");
        formcheck.classList.add("col-md-2");
        
        const input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("value", key);
        input.classList.add("form-check-input");
        input.name = "check" + key;
        input.id = "check" + key;
        input.checked = true;
        input.addEventListener('click', ()=>vista.mostrarTabla());

        const label = document.createElement("label");
        label.setAttribute("for", "check" + key);
        label.classList.add("form-check-label");
        const texto = document.createTextNode(key);

        label.appendChild(texto);
        formcheck.appendChild(input);
        formcheck.appendChild(label);
        row.appendChild(formcheck);

    }

    return row;
}

/**
 * crea el filtro para filtrar entre perro y gato
 * @param {*} vista 
 */
function crearFiltroFila(vista){
   
    const lista = vista.lista;
    
    //     <div class="row">
    //     <div class="col-sm-3">
    //       <select class="form-control">
    //         <option value="+47">Norge (+47)</option>
    //         <option value="+46">Sverige (+46)</option>
    //         <option value="+45">Danmark (+45)</option>
    //       </select>
    //     </div>
    //   </div>

    const row = document.createElement('div');
    row.classList.add("row");

    const div1 = document.createElement('div');
    div1.classList.add("col-sm-6");
    
    const select = document.createElement('select');
    select.classList.add('form-control');
    select.id = "selectfila";
    select.addEventListener('change', ()=>vista.mostrarTabla());

    let animales = lista.map(element=>element.animal).unique();
    
    animales = ["todos", ...animales];

    animales.forEach(element => {
        const option = document.createElement("option");
        option.setAttribute("value", element);
        const texto = document.createTextNode(element);
        
        option.appendChild(texto);
        select.appendChild(option);
    });

    div1.appendChild(select);
    row.appendChild(div1);

    const div2 = document.createElement('div');
    div2.classList.add("form-group");
    div2.classList.add("col-sm-6");
 
    const label = document.createElement('label');
    label.setAttribute('for', 'txtResultadoFiltro');
        
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('disabled', 'true');
    input.id = "txtResultadoFiltro";
    input.classList.add("form-control");

    const texto = document.createTextNode("Precio promedio");

    label.appendChild(texto);
    div2.appendChild(label);
    div2.appendChild(input);

    row.appendChild(div2);

    return row;
}


/**
 * crea la interface de los filtros
 * @param {*} vista 
 */
function crearFiltro(vista){

    const frag = document.createDocumentFragment();

    frag.appendChild(crearFiltroFila(vista));

    frag.appendChild(crearFiltroColumna(vista));
 
    return frag;
}


export {crearTabla, crearFiltro};