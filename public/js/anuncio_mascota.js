import Anuncio from './anuncio.js'

export default class Anuncio_Mascota extends Anuncio{
    constructor(id, titulo, transaccion, descripcion, precio , animal, raza, fecha_nacimiento, vacuna){
        super(id, titulo, transaccion, descripcion, precio )
        this.animal = animal;
        this.raza = raza;
        this.fecha_nacimiento = fecha_nacimiento;
        this.vacuna = vacuna;
    }

}
