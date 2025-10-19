import { Injectable } from '@angular/core';
import { AicApiService } from './aic-api.service';
import { GamingGroup, GamingSession } from '../aic.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamingSessionsApiService {

  constructor(
    private apiService: AicApiService
  ) { }

  index(gamingGroup: GamingGroup): Observable<Array<GamingSession>> {
    return this.apiService.getRecords(this.path(gamingGroup));
  }

  get(gamingGroup: GamingGroup, id: string): Observable<GamingGroup> {
    return this.apiService.getRecord<GamingGroup>(this.path(gamingGroup, id));
  }

  create(gamingGroup: GamingGroup, params: GamingSessionData): Observable<GamingSession> {
    return this.apiService.doPost<GamingSession>(this.path(gamingGroup), {
      gaming_session: params
    });
  }

  private path(group: GamingGroup, id: string = ""): string {
    return `gaming_groups/${group.id}/gaming_sessions/${id}`;
  }

}

export interface GamingSessionData {
  start_time: string
}
