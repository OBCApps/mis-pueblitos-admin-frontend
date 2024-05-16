import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_SERVICE_ADMIN } from '../../../../../../environments/environment.prod';
import { DtoHoteles } from '../../../../modules/hoteles/models/Dtos/DtoHoteles';
import { DtoSubEventoDetalle } from '../../../../modules/eventos/models/DtoEventos';
@Injectable({
  providedIn: 'root', // O especifica un módulo específico si es necesario
})
export class MCSubEventoDetalleService {
  constructor(private http: HttpClient) {}

  private modalFotoService = new Subject<any>();
  modalState$ = this.modalFotoService.asObservable();
  activateModal(option: any) {
    console.log('option foto', option);
    this.modalFotoService.next(option);
  }

  private API_SERVER_ADMIN_SUB_EVENTO_DETAIL =
    API_SERVICE_ADMIN + '/sub-evento-detalle';

  public updateSubEventoDetalle(id: string, data: DtoSubEventoDetalle): Observable<any> {
    return this.http
      .patch<any>(this.API_SERVER_ADMIN_SUB_EVENTO_DETAIL + '/' + id, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public addSubEventoDetalle(data: DtoSubEventoDetalle): Observable<any> {
    return this.http
      .post<any>(this.API_SERVER_ADMIN_SUB_EVENTO_DETAIL, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
