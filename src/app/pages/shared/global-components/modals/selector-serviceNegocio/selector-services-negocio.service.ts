import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { FiltroComunUbigeo } from './structures/FiltroComunNegocioServicio';
import { DominioPaginacion } from './structures/NegocioPaginacion';

import { HttpClient } from '@angular/common/http';
import {
  API_SERVICE_COMUN,
  API_SERVICE_ADMIN,
} from '../../../../../../environments/environment.prod';
@Injectable({
  providedIn: 'root', // O especifica un módulo específico si es necesario
})
export class SelectorServicesNegocio {
  constructor(private http: HttpClient) {}

  private modalUbigeoService = new Subject<any>();
  modalState$ = this.modalUbigeoService.asObservable();
  activateModal(option: any) {
    console.log('option', option);
    this.modalUbigeoService.next(option);
  }

  private API_SERVER_COMUN_DEPARTAMENTO = API_SERVICE_COMUN + '/nombreAPi';

  public list_by_filter(dto: any): Observable<any> {
    return this.http
      .post<any>(
        this.API_SERVER_COMUN_DEPARTAMENTO + '/listarServiciosFiltro',
        dto
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
