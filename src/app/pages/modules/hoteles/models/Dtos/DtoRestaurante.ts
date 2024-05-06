import { DtoMCServicesNegocio } from './DtoMCServicesNegocio';

export class DtoRestaurante {
  id: string;
  nombre: string;
  horaAtencion: {
    'Lunes - Viernes': string;
    Sábados: string;
    Domingos: string;
  };
  tagHora: string;
  tags: string;
  tipo: string;
  estrellas: string;
  direccion: string;
  mapa: string;
  fotos: {
    gallery: string[];
    principal: {
      url: string;
    };
  };
  contactos: {
    gmail: string;
    twitter: string;
    facebook: string;
    whatsapp: string;
    instagram: string;
  };
  descripcion: string;
  infoAdicional: string[];
  name_route: string;
  plan: number;
  ambiente: string;
  menu: [
    {
      id: string;
      nombre: string;
      fotos: {
        url: string;
      };
      ingredientes: string;
      precio: number;
      oferta: number;
      name_route: string;
      restauranteId: string;
    }
  ];
  mc_servicios_rest: DtoMCServicesNegocio[];
}
