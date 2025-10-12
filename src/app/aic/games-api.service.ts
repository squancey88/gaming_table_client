import { Injectable } from '@angular/core';
import { AicApiService } from './aic-api.service';
import { Observable } from 'rxjs';
import { Game } from './aic.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GamesApiService {

  ENDPOINT = "games"

  constructor(
    private apiService: AicApiService
  ) { }

  createGame(gameData: GameData): Observable<Game> {
    return this.apiService.doPost<Game>(this.ENDPOINT, { game: gameData })
  }

  update(id: string, gameData: any): Observable<Game> {
    return this.apiService.doPatch<Game>(`${this.ENDPOINT}/${id}`, { game: gameData })
  }
}

export interface GameData {
  game_system_id: string;
  gaming_session_id: string;
  players_attributes: Array<{
    controller_id: string,
    controller_type: "User"|"Team"
  }>
}
