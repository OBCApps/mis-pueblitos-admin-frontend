import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  API_SERVICE_ADMIN,
} from '../../../../../../environments/environment.prod';
import { DtoRedesSociales } from '../../../../modules/hoteles/models/Dtos/DtoHotelesDetalle';
@Injectable({
  providedIn: 'root', // O especifica un módulo específico si es necesario
})
export class McRedesSocialesService {
  constructor(private http: HttpClient) {}

  private modalFotoService = new Subject<any>();
  modalState$ = this.modalFotoService.asObservable();
  activateModal(option: any) {
    console.log('option foto', option);
    this.modalFotoService.next(option);
  }

  private API_SERVER_ADMIN_FOTO = API_SERVICE_ADMIN + '/mc-redes-sociales';

  public uploadFoto(data: any): Observable<any> {
    delete data.id;
    return this.http.post<any>(this.API_SERVER_ADMIN_FOTO + '/register', data).pipe(
        map((response) => { return response })
    );
  };
  public updateRedSocial(id:string, data:DtoRedesSociales) {
    const temp = data;
    delete temp.id;
    delete temp.hotelDetalleId;
    return this.http.patch<any>(this.API_SERVER_ADMIN_FOTO + '/update/' + id, temp).pipe(
      map((response) => { return response })
    );
  }
}
