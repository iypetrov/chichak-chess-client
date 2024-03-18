import { Injectable } from '@angular/core';
import {Player} from "../../models/Player";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlayerApiService {
  constructor(private http: HttpClient) { }
  getPlayerById(id :string): Observable<Player> {
    return this.http.get<Player>(`${environment.apiUrl}/api/v1/player/${id}`);
  }
}
