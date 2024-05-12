export class FilterDepartamentoDto {
  pais : string;

  pagination: {
      totalRegistros: number,
      inicio: number

  };
  resultado: any[] = []
}
