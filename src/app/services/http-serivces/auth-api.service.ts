import {Injectable} from '@angular/core';
import {RegisterRequest} from "../../models/RegisterRequest";
import {LoginRequest} from "../../models/LoginRequest";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Player} from "../../models/Player";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  constructor(private http: HttpClient) { }

  sendRegistrationRequest(registerRequest: RegisterRequest): Observable<Player> {
    return this.http.post<Player>(`${environment.apiUrl}/api/v1/register`, registerRequest);
  }

  sendLoginRequest(loginRequest: LoginRequest): Observable<Player> {
    return this.http.post<Player>(`${environment.apiUrl}/api/v1/login`, loginRequest);
  }

  // sendLogoutRequest(): Observable<any> {
  //   return this.http.post<any>(`${environment.apiUrl}/api/v1/logout`, null);
  // }
}
