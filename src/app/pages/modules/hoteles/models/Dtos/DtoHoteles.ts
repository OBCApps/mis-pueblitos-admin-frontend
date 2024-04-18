import { DtoHotelesDetalle } from "./DtoHotelesDetalle"

export class DtoHoteles {
    id : string
    nombre: string
    idiomas: any
    precios: number
    tipo: string
    servicios: any
    lugar: string
    ubicacion: string
    contactos: any
    fotos: any
    descripcion: string
    estrellas: number
    name_route: string
    hotelDetalle : DtoHotelesDetalle  = new DtoHotelesDetalle()
}