import { DtoHotelesDetalle } from './DtoHotelesDetalle';
import { DtoMCServicesNegocio } from './DtoMCServicesNegocio';

export class DtoHoteles {
  id: string;
  nombre: string;
  precios: number;
  tipo: string;
  plan: number;
  servicios: DtoMCServicesNegocio[];
  lugar: string;
  ubicacion: string;
  fotos: any;
  descripcion: string;
  estrellas: number;
  name_route: string;
  hotelDetalle: DtoHotelesDetalle;
  habitaciones : any[] = [];
  celular: string;
  direccion: string;
  correo: string;
}
