import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_SERVICE_ADMIN } from '../../../../../environments/environment.prod';
import { DtoRestaurante } from '../models/Dtos/DtoRestaurante';
import { FilterRestauranteDto } from '../models/Filters/FilterRestauranteDto';

@Injectable({
  providedIn: 'root',
})
export class RestauranteService {
  private SERVER_REST = API_SERVICE_ADMIN + '/restaurante';

  constructor(private http: HttpClient) {}

  /* get_list(): Observable<any> {
        return this.http.get<any>(this.SERVER_REST + '/list').pipe(
            map((response) => { return response })
        );
    } */

  get_by_id(id: any): Observable<any> {
    return this.http.get<DtoRestaurante>(this.SERVER_REST + '/' + id).pipe(
      map((response) => {
        return response;
      })
    );
  }

  add_service(id: string, data: any){
    return this.http.post<DtoRestaurante>(this.SERVER_REST + '/addService/' + id,data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  remove_service(id: string, data: any){
    return this.http.post<DtoRestaurante>(this.SERVER_REST + '/removeService/' + id,data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  get_list_filter(filter: FilterRestauranteDto): Observable<any> {
    return this.http
      .post<any>(this.SERVER_REST + '/list-filter', filter)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  get_info_adicional_by_id(id: any): Observable<any> {
    return this.http
      .get<any>(this.SERVER_REST + '/infoAdicional/' + id)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  create(data: DtoRestaurante): Observable<any> {
    return this.http
      .post<DtoRestaurante>(this.SERVER_REST + '/register', data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  uploadFoto(id: string, data: any): Observable<any> {
    return this.http
      .post<any>(this.SERVER_REST + '/upload-foto/' + id, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  update(data: DtoRestaurante): Observable<any> {
    return this.http
      .patch<DtoRestaurante>(this.SERVER_REST + '/update/' + data.id, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  delete(data: DtoRestaurante): Observable<any> {
    return this.http
      .delete<DtoRestaurante>(this.SERVER_REST + '/delete/' + data.id)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
