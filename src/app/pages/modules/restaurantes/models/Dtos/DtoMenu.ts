import {DtoRestaurante} from "./DtoRestaurante";

export class DtoMenu {
  id: string;
  nombre: string;
  fotos: string;
  ingredientes: string;
  precio: number;
  oferta: number;
  name_route: string;
  restauranteId: string;
  restaurante: DtoRestaurante;
}

