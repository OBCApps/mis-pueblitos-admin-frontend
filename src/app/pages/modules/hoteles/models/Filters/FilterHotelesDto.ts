export class FilterHotelesDto {
    user : number
    nombre: string
    precio: string
    tipo: string
    estrellas: string
    ubicacion: string
    lugar: string
    name_route: string


    pagination: {
        totalRegistros: number,
        inicio: number

    };
    resultado: [] = []
}
