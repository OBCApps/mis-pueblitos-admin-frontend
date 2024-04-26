import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_SERVICE_ADMIN } from '../../../../../environments/environment.prod';
import { DtoHotelesDetalle, DtoRedesSociales } from '../models/Dtos/DtoHotelesDetalle';

@Injectable({
    providedIn: 'root'
})
export class RedesSocialesService {
    private SERVER_REDES_SOCIALES = API_SERVICE_ADMIN + '/mc-redes-sociales';

    constructor(
        private http: HttpClient,
    ) { }

    /* get_list(): Observable<any> {
        return this.http.get<any>(this.SERVER_HOTEL_DETAIL + '/list').pipe(
            map((response) => { return response })
        );
    } */

    get_by_id(id: any): Observable<DtoRedesSociales[]> {
        return this.http.get<DtoRedesSociales[]>(this.SERVER_REDES_SOCIALES + '/' + id).pipe(
            map((response) => { return response })
        );
    }

    get_by_hotel_detail_id(id: any): Observable<DtoRedesSociales[]> {
      return this.http.get<DtoRedesSociales[]>(this.SERVER_REDES_SOCIALES + '/hotel-detalle/' + id).pipe(
        map((response) => { return response })
      );
    }

    create(data: DtoRedesSociales): Observable<DtoRedesSociales> {
        return this.http.post<DtoRedesSociales>(this.SERVER_REDES_SOCIALES + '/register', data).pipe(
            map((response) => { return response })
        );
    }

    update(data: DtoRedesSociales): Observable<DtoRedesSociales> {
        return this.http.patch<DtoRedesSociales>(this.SERVER_REDES_SOCIALES + '/update/' + data.id, data).pipe(
            map((response) => { return response })
        );
    }

    delete(data: DtoRedesSociales): Observable<DtoRedesSociales> {
        return this.http.delete<DtoRedesSociales>(this.SERVER_REDES_SOCIALES + '/delete/' + data.id).pipe(
            map((response) => { return response })
        );
    }


}
