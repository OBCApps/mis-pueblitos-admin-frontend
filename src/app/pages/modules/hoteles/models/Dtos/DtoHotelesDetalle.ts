import { DtoMCServicesNegocio } from './DtoMCServicesNegocio';

export class DtoHotelesDetalle {
  id: string;
  idiomas: any;
  servicios: any;
  datos: DtoDatos[];
  redes_sociales: DtoRedesSociales[];
  fotos: {
    gallery: string[];
  };
  mc_servicios_negocios: DtoMCServicesNegocio[];
}

export class DtoRedesSociales {
  tipo: string;
  user: string;
  valor: string;
}

export class DtoDatos {
  tipo: string;
  valor: string;
}
