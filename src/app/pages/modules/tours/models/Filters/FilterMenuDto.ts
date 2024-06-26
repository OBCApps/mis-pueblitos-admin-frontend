import { Agencia, Itinerario } from '../Dtos/DtoTours';

export class FilterAgenciaDto {
  user: number;
  nombre: string;
  tipo: string;
  tipoCocina: string;
  tagHora: string;
  estrellas: number;
  ambiente: string;
  name_route: string;

  pagination: {
    totalRegistros: number;
    inicio: number;
  };
  resultado: Agencia[] = [];
}

export class FilterItinerarioDto {
  user: number;
  nombre: string;
  tipo: string;
  tipoCocina: string;
  tagHora: string;
  estrellas: number;
  ambiente: string;
  name_route: string;

  pagination: {
    totalRegistros: number;
    inicio: number;
  };
  resultado: Itinerario[] = [];
}
