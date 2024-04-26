import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_SERVICE_ADMIN } from '../../../../../environments/environment.prod';
import { DtoHabitacion } from '../models/Dtos/DtoHabitacion';
import { FilterHabitacionDto } from '../models/Filters/FilterHabitacionDto';

@Injectable({
    providedIn: 'root'
})
export class HabitacionService {
    private SERVER_HABITACION = API_SERVICE_ADMIN + '/habitacion';

    constructor(
        private http: HttpClient,
    ) { }

    /* get_list(): Observable<any> {
        return this.http.get<any>(this.SERVER_HABITACION + '/list').pipe(
            map((response) => { return response })
        );
    } */

    get_by_id(id: any): Observable<any> {
        return this.http.get<DtoHabitacion>(this.SERVER_HABITACION + '/' + id).pipe(
            map((response) => { return response })
        );
    }

    get_list_filter(filter: FilterHabitacionDto): Observable<any> {
        return this.http.post<any>(this.SERVER_HABITACION + '/list-filter', filter).pipe(
            map((response) => { return response })
        );
    }

    get_info_adicional_by_id(id: any): Observable<any> {
        return this.http.get<any>(this.SERVER_HABITACION + '/infoAdicional/' + id).pipe(
            map((response) => { return response })
        );
    }

    create(data: DtoHabitacion): Observable<any> {
        return this.http.post<DtoHabitacion>(this.SERVER_HABITACION + '/register', data).pipe(
            map((response) => { return response })
        );
    }

    uploadFoto(id: string,data: any): Observable<any> {
        return this.http.post<any>(this.SERVER_HABITACION + '/upload-foto/'+id, data).pipe(
            map((response) => { return response })
        );
    }

    update(data: DtoHabitacion): Observable<any> {
        return this.http.patch<DtoHabitacion>(this.SERVER_HABITACION + '/update/' + data.id, data).pipe(
            map((response) => { return response })
        );
    }

    delete(data: DtoHabitacion): Observable<any> {
        return this.http.delete<DtoHabitacion>(this.SERVER_HABITACION + '/delete/' + data.id).pipe(
            map((response) => { return response })
        );
    }


}
