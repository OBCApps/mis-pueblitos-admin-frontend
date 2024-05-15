import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_SERVICE_ADMIN } from '../../../../../environments/environment.prod';
import { FilterTourDto } from '../models/Filters/FilterTourDto';

@Injectable({
  providedIn: 'root',
})
export class ItinerarioService {
  private SERVER_ITINERARIO = API_SERVICE_ADMIN + '/itinerario';

  constructor(private http: HttpClient) {}

  get_list(): Observable<any> {
    return this.http.get<any>(this.SERVER_ITINERARIO).pipe(
      map((response) => {
        return response;
      })
    );
  }

  get_by_id(id: any): Observable<any> {
    return this.http.get<any>(this.SERVER_ITINERARIO + '/' + id).pipe(
      map((response) => {
        return response;
      })
    );
  }

  get_list_filter(filter: FilterTourDto): Observable<any> {
    return this.http.post<any>(this.SERVER_ITINERARIO + '/list-filter', filter).pipe(
      map((response) => {
        return response;
      })
    );
  }

  create(data: any): Observable<any> {
    return this.http
      .post<any>(this.SERVER_ITINERARIO, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  update(data: any): Observable<any> {
    return this.http
      .patch<any>(this.SERVER_ITINERARIO + '/' + data.id, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  delete(data: any): Observable<any> {
    return this.http
      .delete<any>(this.SERVER_ITINERARIO + '/' + data.id)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
