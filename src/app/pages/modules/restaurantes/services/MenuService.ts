import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, map} from 'rxjs';
import {API_SERVICE_ADMIN} from '../../../../../environments/environment.prod';
import {DtoMenu} from '../models/Dtos/DtoMenu';
import {FilterRestauranteDto} from '../models/Filters/FilterRestauranteDto';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private SERVER_MENU = API_SERVICE_ADMIN + '/platos';

  constructor(private http: HttpClient) {}

  get_list(): Observable<any> {
    return this.http.get<any>(this.SERVER_MENU + '/list').pipe(
      map((response) => {return response})
    );
  }

  get_by_id(id: any): Observable<any> {
    return this.http.get<DtoMenu>(this.SERVER_MENU + '/' + id).pipe(
      map((response) => {
        return response;
      })
    );
  }

  get_list_filter(filter: FilterRestauranteDto): Observable<any> {
    return this.http
      .post<any>(this.SERVER_MENU + '/list-filter', filter)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  create(data: DtoMenu): Observable<any> {
    return this.http
      .post<DtoMenu>(this.SERVER_MENU + '/register', data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  uploadFoto(id: string, data: any): Observable<any> {
    return this.http
      .post<any>(this.SERVER_MENU + '/upload-foto/' + id, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  update(data: DtoMenu): Observable<any> {
    return this.http
      .patch<DtoMenu>(this.SERVER_MENU + '/update/' + data.id, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  delete(data: DtoMenu): Observable<any> {
    return this.http
      .delete<DtoMenu>(this.SERVER_MENU + '/delete/' + data.id)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
