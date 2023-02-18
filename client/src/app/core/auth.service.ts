import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from "@angular/common/http";

import { throwError } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";

import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from "moment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'https://localhost:8000';
  helper = new JwtHelperService();

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.authUrl + '/api/login_check', { username, password }, { headers })
      .pipe(
        map(res => {
          console.log("logged in " + JSON.stringify(res))
          localStorage.setItem('auth_token', res.token);
        }),
        catchError(this.handleError)
      )
  }


  register(username: string, password: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.authUrl + '/api/register', { username, password }, { headers })
      .pipe(
        tap(res => console.log("registered " + JSON.stringify(res)))
      )
  }

  // 👇 En caso de estar registrado nuestro valor de expiración será menor que el momento actual.
  isLoggedIn() {
      let now = moment();
      return now.isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
    const auth_token: any = localStorage.getItem('auth_token');
    const token = this.helper.decodeToken(auth_token);
    if (token == null)
      return moment.now;
    else 
      return token.exp;
  }


  // Obtener el rol decodificando el token almacenado en localStorage.
  public getRole() {
    const auth_token: any = localStorage.getItem('auth_token');
    const token = this.helper.decodeToken(auth_token);
    return token.roles[0];
  }
  // Obtener el nombre de usuario, la decodificación se realiza con 
  // un helper ofrecido por auth0/angular-jwt
  public getUsername() {
    const auth_token: any = localStorage.getItem('auth_token');
    const token = this.helper.decodeToken(auth_token);
    return token.username;
  }


  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    alert(`An error occurred: ${err.error.message}`);
    console.error(err);
    return throwError(() => err.error.message);
  }
}
