import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { apiDomain } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  isAuthenticated(){
    if(this.cookieService.get('token')){
      return true;
    }else{
      return false;
    }

  }

  iniciarSesion(correo: string, contraseña: string): Observable<boolean> {
    return this.http.post<any>(`${apiDomain}/api/login`, { "email": correo, "password": contraseña }).pipe(
      map(response => {
        // console.log('Respuesta de la API:', response);
        if (response.success) {
          this.cookieService.set('token', response.data.token);
          this.cookieService.set('nombre', response.data.name);
          return true;
        } else {
          return false;
        }
      }),
    );
  }

  checkValidToken(): Observable<boolean> {
    let token = this.cookieService.get('token');
    if (token) {
      let headers = new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.post<any>(`${apiDomain}/api/check-login`, null, { headers }).pipe(
        map(response => {
          // console.log('Respuesta de la API:', response);
          if (response.success) {
            return true;
          } else {
            return false;
          }
        }),
      );
    } else {
      return of(false);
    }
  }

  cerrarSesion(): Observable<any> {
    let token = this.cookieService.get('token');
    if (token) {
      let headers = new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.get<any>(`${apiDomain}/api/logout`, { headers: headers }).pipe(
        map(response => {
          // console.log('Respuesta de la API:', response);
          if (response) {
            return true
          } else {
            return false;
          }
        }),
      );
    } else {
      return of(false);
    }
  }



}
