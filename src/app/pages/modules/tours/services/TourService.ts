import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_SERVICE_ADMIN } from '../../../../../environments/environment.prod';
import { DtoTours } from '../models/Dtos/DtoTours';
import { FilterTourDto } from '../models/Filters/FilterTourDto';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  private SERVER_TOUR = API_SERVICE_ADMIN + '/tour';

  constructor(private http: HttpClient) {}

  get_list(): Observable<any> {
    return this.http.get<any>(this.SERVER_TOUR).pipe(
      map((response) => {
        return response;
      })
    );
  }

  get_by_id(id: any): Observable<any> {
    return this.http.get<DtoTours>(this.SERVER_TOUR + '/' + id).pipe(
      map((response) => {
        return response;
      })
    );
  }

  edit_horaAtencion(id: string, data: any) {
    return this.http
      .post<DtoTours>(this.SERVER_TOUR + '/editHoraAtencion/' + id, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  get_list_filter(filter: FilterTourDto): Observable<any> {
    return this.http.post<any>(this.SERVER_TOUR + '/list-filter', filter).pipe(
      map((response) => {
        return response;
      })
    );
  }

  get_info_adicional_by_id(id: any): Observable<any> {
    return this.http.get<any>(this.SERVER_TOUR + '/infoAdicional/' + id).pipe(
      map((response) => {
        return response;
      })
    );
  }

  create(data: DtoTours): Observable<any> {
    return this.http
      .post<DtoTours>(this.SERVER_TOUR, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  uploadFoto(id: string, data: any): Observable<any> {
    return this.http
      .post<any>(this.SERVER_TOUR + '/upload-foto/' + id, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  update(data: DtoTours): Observable<any> {
    return this.http
      .patch<DtoTours>(this.SERVER_TOUR + '/' + data.id, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  delete(data: DtoTours): Observable<any> {
    return this.http
      .delete<DtoTours>(this.SERVER_TOUR + '/' + data.id)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
