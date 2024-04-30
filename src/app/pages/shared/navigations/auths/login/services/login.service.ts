import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_SERVICE_SEGURIDAD } from '../../../../../../../environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private API_SERVICE_SEGURIDAD = API_SERVICE_SEGURIDAD ;
  private user = this.API_SERVICE_SEGURIDAD + '/user';
 
  constructor(
    private http: HttpClient,
    
  ) { } 

  login(data : any): Observable<any> {       
    return this.http.post<any>(this.user + '/login' , data);
  }

}
