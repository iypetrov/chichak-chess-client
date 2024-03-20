import { Injectable } from '@angular/core';
import {Player} from "../../models/Player";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {PlayerParticipantion} from "../../models/PlayerParticipantion";
@Injectable({
  providedIn: 'root'
})
export class PlayerApiService {
  constructor(private http: HttpClient) { }
  getPlayerById(id :string): Observable<Player> {
    return this.http.get<Player>(`${environment.apiUrl}/api/v1/players/${id}`);
  }

  getPlayerHistory(playerID: string, pageNumber: number, pageSize: number): Observable<PlayerParticipantion []> {
    return this.http.get<PlayerParticipantion[]>(`${environment.apiUrl}/api/v1/game-participants?playerID=${playerID}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
}
