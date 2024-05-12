import { DtoRedesSociales } from '../../../hoteles/models/Dtos/DtoHotelesDetalle';
import { DtoMCServicesNegocio } from '../../../hoteles/models/Dtos/DtoMCServicesNegocio';

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
    principal: string;
  };
  contactos: {
    gmail: string;
    twitter: string;
    facebook: string;
    whatsapp: string;
    instagram: string;
  };
  descripcion: string;
  infoAdicional: any;
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
  mc_redes_sociales: DtoRedesSociales[];
}


