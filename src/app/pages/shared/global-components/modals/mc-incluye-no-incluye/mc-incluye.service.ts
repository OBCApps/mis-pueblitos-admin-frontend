import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_SERVICE_ADMIN } from '../../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root', // O especifica un módulo específico si es necesario
})
export class McIncluyeService {
  constructor(private http: HttpClient) {}

  private modalFotoService = new Subject<any>();
  modalState$ = this.modalFotoService.asObservable();
  activateModal(option: any) {
    console.log('option action modal', option);
    this.modalFotoService.next(option);
  }


  private API_SERVER_ADMIN_TOUR = API_SERVICE_ADMIN + '/tour';

  public uploadFoto(id: string, data: any): Observable<any> {
    return this.http
      .patch<any>(this.API_SERVER_ADMIN_TOUR + '/' + id, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
