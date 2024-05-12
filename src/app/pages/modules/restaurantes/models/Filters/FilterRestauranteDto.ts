import { DtoRestaurante } from "../Dtos/DtoRestaurante";

export class FilterRestauranteDto {
    user : number;
    nombre: string;
    tipo: string;
    tipoCocina: string;
    tagHora: string;
    estrellas: number;
    ambiente: string;
    name_route: string;

    pagination: {
        totalRegistros: number,
        inicio: number

    };
    resultado: DtoRestaurante[] = [];
}
