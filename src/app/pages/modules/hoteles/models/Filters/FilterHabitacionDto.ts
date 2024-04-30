import { DtoHabitacion } from "../Dtos/DtoHabitacion";

export class FilterHabitacionDto {
    user : number;
    nombre: string;
    precio: number;
    disponible: boolean;
    personas: number;
    camas: number;
    tipo: string;
    hotelNombre: string;
    estrellas: string;
    name_route: string;

    pagination: {
        totalRegistros: number,
        inicio: number

    };
    resultado: DtoHabitacion[] = [];
}

