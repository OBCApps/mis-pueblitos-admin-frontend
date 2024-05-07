import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_SERVICE_ADMIN } from '../../../../../../environments/environment.prod';
import { DtoHoteles } from '../../../../modules/hoteles/models/Dtos/DtoHoteles';
@Injectable({
  providedIn: 'root', // O especifica un módulo específico si es necesario
})
export class McInfoAdicionalService {
  constructor(private http: HttpClient) {}

  private modalFotoService = new Subject<any>();
  modalState$ = this.modalFotoService.asObservable();
  activateModal(option: any) {
    console.log('option action modal', option);
    this.modalFotoService.next(option);
  }

  private API_SERVER_ADMIN_FOTO = API_SERVICE_ADMIN + '/hoteles';
  private API_SERVER_ADMIN_REST = API_SERVICE_ADMIN + '/restaurante';

  public uploadFoto(id: string, data: any): Observable<any> {
    const { celular, direccion, correo } = data;
    return this.http
      .patch<any>(this.API_SERVER_ADMIN_FOTO + '/update/' + id, {
        celular,
        direccion,
        correo,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public addInfoAdicional(data: any): Observable<any> {
    return this.http
      .post<any>(API_SERVICE_ADMIN + '/mc-info-adicional/', data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public updateInfoAdicional(data: any): Observable<any> {
    return this.http
      .patch<any>(API_SERVICE_ADMIN + '/mc-info-adicional/' + data.id, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public addInfoAdicionalHotel(id: string, data: any): Observable<any> {
    return this.http
      .post<any>(API_SERVICE_ADMIN + '/hotel-detalle/infoAdicional/'+id, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public updateInfoAdicionalRest(id: string, data: any): Observable<any> {
    return this.http
      .patch<any>(this.API_SERVER_ADMIN_REST + '/editInfoAdicional/'+id, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
