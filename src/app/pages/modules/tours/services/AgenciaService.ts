import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_SERVICE_ADMIN } from '../../../../../environments/environment.prod';
import { Agencia } from '../models/Dtos/DtoTours';

@Injectable({
  providedIn: 'root',
})
export class AgenciaService {
  private SERVER_AGENCIA = API_SERVICE_ADMIN + '/agencia';

  constructor(private http: HttpClient) {}

  get_list(): Observable<Agencia[]> {
    return this.http.get<Agencia[]>(this.SERVER_AGENCIA).pipe(
      map((response) => {
        return response;
      })
    );
  }

  get_by_id(id: string): Observable<Agencia> {
    return this.http.get<Agencia>(this.SERVER_AGENCIA + '/' + id).pipe(
      map((response) => {
        return response;
      })
    );
  }

  get_list_filter(filter: any): Observable<Agencia[]> {
    return this.http.post<Agencia[]>(this.SERVER_AGENCIA + '/list-filter', filter).pipe(
      map((response) => {
        return response;
      })
    );
  }

  create(data: Agencia): Observable<Agencia> {
    return this.http.post<Agencia>(this.SERVER_AGENCIA, data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  uploadFoto(id: string, data: any): Observable<Agencia> {
    return this.http
      .post<Agencia>(this.SERVER_AGENCIA + '/upload-foto/' + id, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  update(data: Agencia): Observable<Agencia> {
    return this.http
      .patch<Agencia>(this.SERVER_AGENCIA + '/' + data.id, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  delete(data: Agencia): Observable<Agencia> {
    return this.http
      .delete<Agencia>(this.SERVER_AGENCIA + '/' + data.id)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
