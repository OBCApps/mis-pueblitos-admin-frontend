import { DtoMCServicesNegocio } from "./DtoMCServicesNegocio";

export class DtoHabitacion {
  id: string;
  nombre: string; 
  servicios: DtoMCServicesNegocio [];
  tipoMoneda: string;
  precio: number;
  disponible: boolean;
  descripcion: string;
  personas: number;
  camas: number;
  tipo: string;
  fotos: object;
  hotelId: string;
  hotelNombre: string;
  estrellas: number;
  name_route: string;
  hotel: {
    nombre: string;
    tipo: string;
  }
}
