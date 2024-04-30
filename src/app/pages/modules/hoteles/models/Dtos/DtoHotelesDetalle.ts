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
  infoAdicional: DtoInfoAdicional[];
}

export class DtoRedesSociales {
  id: string;
  tipo: string;
  usuario: string;
  valor: string;
  hotelDetalleId: string;
}

export class DtoDatos {
  tipo: string;
  valor: string;
}


export class DtoInfoAdicional {
  id: string;
  nombreInfo: string;
  descInfo: string;
}
