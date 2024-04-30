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
  public uploadFoto(id: string, data: any, tipo: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', data);
    const base_url = tipo == 'HAB' ? this.API_SERVER_ADMIN_FOTO_HAB : this.API_SERVER_ADMIN_FOTO;
    return this.http
      .post<any>(base_url + '/register-file/' + id, formData)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
