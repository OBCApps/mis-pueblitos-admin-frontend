import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_SERVICE_ADMIN } from '../../../../../../environments/environment.prod';
import { Itinerario } from '../../../../modules/tours/models/Dtos/DtoTours';

@Injectable({
  providedIn: 'root', // O especifica un módulo específico si es necesario
})
export class McItinerarioService {
  constructor(private http: HttpClient) {}

  private modalFotoService = new Subject<any>();
  modalState$ = this.modalFotoService.asObservable();
  activateModal(option: any) {
    console.log('option action modal', option);
    this.modalFotoService.next(option);
  }


  private API_SERVER_ADMIN_TOUR = API_SERVICE_ADMIN + '/itinerario';

  public uploadFoto(id: string, data: any): Observable<any> {
    return this.http
      .patch<any>(this.API_SERVER_ADMIN_TOUR + '/' + id, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  public create(data: Itinerario): Observable<Itinerario> {
    return this.http
      .post<Itinerario>(this.API_SERVER_ADMIN_TOUR, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  public update(data: Itinerario): Observable<Itinerario> {
    return this.http
      .patch<Itinerario>(this.API_SERVER_ADMIN_TOUR + '/' + data.id, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
