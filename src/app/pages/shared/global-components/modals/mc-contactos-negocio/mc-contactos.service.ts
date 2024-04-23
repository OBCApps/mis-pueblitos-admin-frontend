import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
    API_SERVICE_ADMIN,
} from '../../../../../../environments/environment.prod';
@Injectable({
    providedIn: 'root', // O especifica un módulo específico si es necesario
})
export class McContactosNegociosService {
    constructor(private http: HttpClient) { }

    private modalFotoService = new Subject<any>();
    modalState$ = this.modalFotoService.asObservable();
    activateModal(option: any) {
        console.log('option foto', option);
        this.modalFotoService.next(option);
    }

    private API_SERVER_ADMIN_FOTO = API_SERVICE_ADMIN + '/hotel-detalle';

    public uploadFoto(id: string, data: any): Observable<any> {
        const formData = new FormData();
        formData.append('file', data);
        return this.http.post<any>(this.API_SERVER_ADMIN_FOTO + '/register-file/' + id, formData).pipe(
            map((response) => { return response })
        );
    };
}
