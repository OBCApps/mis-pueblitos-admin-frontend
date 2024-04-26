import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_SERVICE_ADMIN } from '../../../../../environments/environment.prod';
import { DtoHotelesDetalle } from '../models/Dtos/DtoHotelesDetalle';

@Injectable({
    providedIn: 'root'
})
export class HotelDetailService {
    private SERVER_HOTEL_DETAIL = API_SERVICE_ADMIN + '/hotel-detalle';

    constructor(
        private http: HttpClient,
    ) { }

    /* get_list(): Observable<any> {
        return this.http.get<any>(this.SERVER_HOTEL_DETAIL + '/list').pipe(
            map((response) => { return response })
        );
    } */

    get_by_id(id: any): Observable<any> {
        return this.http.get<DtoHotelesDetalle>(this.SERVER_HOTEL_DETAIL + '/' + id).pipe(
            map((response) => { return response })
        );
    }

    get_info_adicional_by_id(id: any): Observable<any> {
        return this.http.get<any>(this.SERVER_HOTEL_DETAIL + '/infoAdicional/' + id).pipe(
            map((response) => { return response })
        );
    }

    create(data: DtoHotelesDetalle): Observable<any> {
        return this.http.post<DtoHotelesDetalle>(this.SERVER_HOTEL_DETAIL + '/register', data).pipe(
            map((response) => { return response })
        );
    }

    uploadFoto(id: string,data: any): Observable<any> {
        return this.http.post<any>(this.SERVER_HOTEL_DETAIL + '/upload-foto/'+id, data).pipe(
            map((response) => { return response })
        );
    }

    update(data: DtoHotelesDetalle): Observable<any> {
        return this.http.patch<DtoHotelesDetalle>(this.SERVER_HOTEL_DETAIL + '/update/' + data.id, data).pipe(
            map((response) => { return response })
        );
    }

    delete(data: DtoHotelesDetalle): Observable<any> {
        return this.http.delete<DtoHotelesDetalle>(this.SERVER_HOTEL_DETAIL + '/delete/' + data.id).pipe(
            map((response) => { return response })
        );
    }


}
