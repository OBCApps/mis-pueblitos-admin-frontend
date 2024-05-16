import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_SERVICE_ADMIN } from '../../../../../environments/environment.prod';
import { DtoEvento, DtoEventos } from '../models/DtoEventos';

@Injectable({
  providedIn: 'root',
})
export class ProveedoresService {
  private API_SERVER_PROVEEDOR = API_SERVICE_ADMIN + '/proveedor';

  constructor(private http: HttpClient) {}

  // -------- LISTADO DE ENTIDADES ---------- \\
  get_listado_proveedores(): Observable<DtoEventos[]> {
    return this.http.get<DtoEventos[]>(this.API_SERVER_PROVEEDOR).pipe(
      map((response) => {
        return response;
      })
    );
  }

  // -------- CRUD ENTIDADES ---------- \\
  get_proveedor(id: any): Observable<DtoEvento> {
    return this.http.get<DtoEvento>(this.API_SERVER_PROVEEDOR + '/' + id).pipe(
      map((response) => {
        return response;
      })
    );
  }

}
