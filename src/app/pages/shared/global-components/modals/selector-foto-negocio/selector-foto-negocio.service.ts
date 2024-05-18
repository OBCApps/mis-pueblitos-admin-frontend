import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_SERVICE_ADMIN } from '../../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root', // O especifica un módulo específico si es necesario
})
export class SelectorFotoNegocioService {
  constructor(private http: HttpClient) {}

  private modalFotoService = new Subject<any>();
  modalState$ = this.modalFotoService.asObservable();
  activateModal(option: any) {
    console.log('option foto', option);
    this.modalFotoService.next(option);
  }

  private API_SERVER_ADMIN_FOTO = API_SERVICE_ADMIN + '/hotel-detalle';
  private API_SERVER_ADMIN_FOTO_HAB = API_SERVICE_ADMIN + '/habitacion';
  private API_SERVER_ADMIN_FOTO_REST = API_SERVICE_ADMIN + '/restaurante';
  private API_SERVER_ADMIN_FOTO_PLATO = API_SERVICE_ADMIN + '/platos';
  private API_SERVER_ADMIN_FOTO_TOUR = API_SERVICE_ADMIN + '/tour';
  private API_SERVER_ADMIN_FOTO_AGENCIA = API_SERVICE_ADMIN + '/agencia';
  private API_SERVER_ADMIN_FOTO_EVENTO = API_SERVICE_ADMIN + '/evento';
  public uploadFoto(id: string, data: any, tipo: string,infoImage:any): Observable<any> {
    const formData = new FormData();
    formData.append('file', data);
    if(tipo == "EVENTO"){
      formData.append('infoImage', JSON.stringify(infoImage));
    }
    const base_url =
      tipo == 'HAB'
        ? this.API_SERVER_ADMIN_FOTO_HAB
        : tipo == 'REST'
        ? this.API_SERVER_ADMIN_FOTO_REST
        : tipo == 'PLATO'
        ? this.API_SERVER_ADMIN_FOTO_PLATO
        : tipo == 'TOUR'
        ? this.API_SERVER_ADMIN_FOTO_TOUR
        : tipo == 'AGENCIA'
        ? this.API_SERVER_ADMIN_FOTO_AGENCIA
        : tipo == 'EVENTO'
        ? this.API_SERVER_ADMIN_FOTO_EVENTO
        : this.API_SERVER_ADMIN_FOTO;
    return this.http
      .post<any>(base_url + '/register-file/' + id, formData)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
