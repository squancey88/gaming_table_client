import { Injectable } from '@angular/core';
import { AicApiService } from './aic-api.service';
import { Observable } from 'rxjs';
import { GameSystem } from './aic.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GameSystemsApiService {

  ENDPOINT = "game_systems"

  constructor(
    private apiService: AicApiService
  ) { }

  index(): Observable<Array<GameSystem>> {
    return this.apiService.getRecords<GameSystem>(this.ENDPOINT);
  }
}
