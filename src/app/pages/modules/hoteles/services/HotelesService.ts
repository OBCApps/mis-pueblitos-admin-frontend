import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_SERVICE_ADMIN } from '../../../../../environments/environment.prod';
import { FilterHotelesDto } from '../models/Filters/FilterHotelesDto';
import { DtoHoteles } from '../models/Dtos/DtoHoteles';

@Injectable({
    providedIn: 'root'
})
export class HotelesService {
    private SERVER_HOTEL = API_SERVICE_ADMIN + '/hoteles';

    constructor(
        private http: HttpClient,
    ) { }

    get_list(): Observable<any> {
        return this.http.get<any>(this.SERVER_HOTEL + '/list').pipe(
            map((response) => { return response })
        );
    }

    get_list_filter(filter: FilterHotelesDto): Observable<any> {
        return this.http.post<any>(this.SERVER_HOTEL + '/list-filter', filter).pipe(
            map((response) => { return response })
        );
    }

    get_by_id(id: any): Observable<any> {
        return this.http.get<any>(this.SERVER_HOTEL + '/' + id).pipe(
            map((response) => { return response })
        );
    }

    create(data: DtoHoteles): Observable<any> {
        return this.http.post<any>(this.SERVER_HOTEL + '/register', data).pipe(
            map((response) => { return response })
        );
    }

    update(data: DtoHoteles): Observable<any> {
        return this.http.patch<any>(this.SERVER_HOTEL + '/update', data).pipe(
            map((response) => { return response })
        );
    }

    delete(data: DtoHoteles): Observable<any> {
        return this.http.put<DtoHoteles>(this.SERVER_HOTEL + '/delete' , data).pipe(
            map((response) => { return response })
        );
    }


}
