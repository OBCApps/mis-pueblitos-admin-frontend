export class DtoTours {
  id: string;
  nombre: string;
  duracion: number;
  precio: number;
  fotos: {
    gallery: string[];
    principal: string;
  };
  descripcion: string;
  idioma: string;
  group_size: string;
  destinos: string[];
  imagesDestinos: string[];
  incluye: string[];
  noIncluye: string[];
  recomendaciones: string[];
  infoAdicional: any;
  name_route: string;
  tag: string;
  tipo: string;
  agenciaId: string;
  atractivoTuristicoId: string;
  itinerario: Itinerario[];
  agencia: Agencia;
}

export class Itinerario {
  id: string;
  dia: string;
  actividades: string[];
  tourId: string;
}

export class Agencia {
  id: string;
  nombre: string;
  estrellas: number;
  direccion: string;
  mapa: string;
  fotos: {
    gallery: string[];
    principal: string;
  };
  contactos: any;
  descripcion: string;
  mision: string;
  vision: string;
  plan: number;
  equipo: string;
  infoAdicional: any;
  name_route: string;
  mc_redes_sociales: RedSocial[];
}

export class RedSocial {
  id?: string;
  tipo?: string;
  valor?: string;
  usuario?: string;
  hotelDetalleId?: string;
  restauranteId?: string;
  agenciaId?: string;
}
