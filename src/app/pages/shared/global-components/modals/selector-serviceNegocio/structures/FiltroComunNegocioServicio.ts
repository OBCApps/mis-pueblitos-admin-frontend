import { DominioPaginacion } from "./NegocioPaginacion";

export class FiltroComunUbigeo {

    constructor() {
        this.paginacion = new DominioPaginacion();
    }
    paginacion: DominioPaginacion;

    tipoNegocio: string;
    nombreServicio: string;
}