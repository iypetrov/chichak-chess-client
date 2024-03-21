import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Game} from "../../models/Game";
import {GameState} from "../../models/GameState";
import {Injectable} from "@angular/core";
import {GameMovement} from "../../models/GameMovement";
import {GameComponent} from "../../game/game.component";

@Injectable({
  providedIn: 'root'
})
export class GameApiService {
  constructor(private http: HttpClient) { }

  enrollGame(id: string | undefined): Observable<Game> {
    return this.http.post<Game>(`${environment.apiUrl}/api/v1/matchmaking/enroll/${id}`, null);
  }

  makeMovement(gameID: string | undefined, playerID: string | undefined, movement: string | undefined) : Observable<GameState> {
    const mvm: GameMovement = {
      gameID: gameID,
      playerID: playerID,
      movement: movement
    };
    return this.http.post<GameState>(`${environment.apiUrl}/api/v1/game/movement`, mvm);
  }

  getCurrentGameState(id: string): Observable<GameState> {
    return this.http.get<GameState>(`${environment.apiUrl}/api/v1/game/${id}`);
  }

  surrenderGame(id: string | undefined): Observable<GameState> {
    return this.http.post<GameState>(`${environment.apiUrl}/api/v1/game/surrender/${id}`,null);
  }
}
