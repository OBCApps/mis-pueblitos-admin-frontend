export class DtoSubEventoCreate {
  nombre: string;
  descripcion: string;
  foto: any;
  dia: string;
  horaInicio: string;
  horaFin: string;
  eventoId: string;
}

export class DtoSubEvento {
  id: string;
  nombre: string;
  descripcion: string;
  foto: any;
  dia: string;
  horaInicio: string;
  horaFin: string;
  eventoId: string;
  evento: {
    id: string;
    nombre: string;
    descripcion: string;
    foto: any;
    ubicacionExacta: string;
    fechaInicio: string;
    fechaFin: string;
    lugarId: string;
    lugar: {
      id: string;
      nombre: string;
      descripcion: string;
      foto: any;
      video: string;
      masDestacado: boolean;
      departamentoId: string;
    };
  };
  subEventoDetalles: [
    {
      id: string;
      detalle: string;
      organizador: string;
      foto: any;
      recomendaciones: string;
      horaInicio: string;
      horaFin: string;
      subEventoId: string;
      subEventoNombre: string;
    }
  ];
}

export class DtoSubEventoDetalle {
  id: string;
  detalle: string;
  organizador: string;
  foto: any;
  recomendaciones: string;
  horaInicio: string;
  horaFin: string;
  subEventoId: string;
  subEventoNombre: string;
}

export class DtoEventos {
  id: string;
  nombre: string;
  descripcion: string;
  foto: any;
  ubicacionExacta: string;
  fechaInicio: string;
  fechaFin: string;
  lugarId: string;
  lugar: {
    id: string;
    nombre: string;
    descripcion: string;
    foto: any;
    video: string;
    masDestacado: boolean;
    departamentoId: string;
  };
  subEventos: [
    {
      id: string;
      nombre: string;
      descripcion: string;
      foto: any;
      dia: string;
      horaInicio: string;
      horaFin: string;
      eventoId: string;
    }
  ];
}
export class DtoEvento {
  id: string;
  nombre: string;
  descripcion: string;
  foto: any;
  ubicacionExacta: string;
  fechaInicio: string;
  fechaFin: string;
  lugarId: string;
  lugarNombre: string;
  subEventosPorDia: {
    fecha: [
      {
        id: string;
        detalle: string;
        organizador: string;
        foto: any;
        recomendaciones: string;
        horaInicio: string;
        horaFin: string;
        subEventoId: string;
      }
    ];
  };
}
