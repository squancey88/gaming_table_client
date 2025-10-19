import { Injectable } from '@angular/core';
import { AicApiService } from './aic-api.service';
import { Observable } from 'rxjs';
import { GamingGroup } from '../aic.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GamingGroupsApiService {

  ENDPOINT = "gaming_groups"

  constructor(
    private apiService: AicApiService
  ) { }

  index(): Observable<Array<GamingGroup>> {
    return this.apiService.getRecords(this.ENDPOINT);
  }

  get(id: string): Observable<GamingGroup> {
    return this.apiService.getRecord<GamingGroup>(`${this.ENDPOINT}/${id}`);
  }
}
