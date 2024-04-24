import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_SERVICE_ADMIN } from '../../../../../environments/environment.prod';
import { DtoInfoAdicional } from '../models/Dtos/DtoHotelesDetalle';

@Injectable({
  providedIn: 'root',
})
export class InfoAdicionalService {
  private SERVER_HOTEL_DETAIL = API_SERVICE_ADMIN + '/mc-info-adicional';

  constructor(private http: HttpClient) {}

  /* get_list(): Observable<any> {
        return this.http.get<any>(this.SERVER_HOTEL_DETAIL + '/list').pipe(
            map((response) => { return response })
        );
    } */

  get_info_adicional_by_id(id: any): Observable<any> {
    return this.http.get<any>(this.SERVER_HOTEL_DETAIL + '/' + id).pipe(
      map((response) => {
        return response;
      })
    );
  }

  update(data: DtoInfoAdicional): Observable<DtoInfoAdicional> {
    return this.http
      .patch<DtoInfoAdicional>(this.SERVER_HOTEL_DETAIL + data.id, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  delete(data: DtoInfoAdicional): Observable<DtoInfoAdicional> {
    return this.http
      .delete<DtoInfoAdicional>(this.SERVER_HOTEL_DETAIL + '/' + data.id)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
