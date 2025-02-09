import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GamingGroup, SELECTED_GROUP_KEY } from './aic.interfaces';
import { Login } from '../data-interfaces';
import { AicApiService } from './aic-api.service';
import { map } from 'rxjs';
import { TOKEN_STORAGE_KEY } from './aic.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AICService {

  public loggedIn = new BehaviorSubject<boolean>(false);
  private currentToken?: string = undefined;
  public selectedGroup = new BehaviorSubject<GamingGroup|undefined>(undefined);

  constructor(
    private apiService: AicApiService,
  ) { 
    this.loggedIn.subscribe((status) => {
      console.log("logged in status", status)
    });
    const token = localStorage.getItem(TOKEN_STORAGE_KEY)
    if(token){
      this.currentToken = token;
      this.loggedIn.next(true);
      this.loadGroup();
    }
  }

  login(loginData: Login): Observable<boolean>{
    return this.apiService.login(loginData).pipe(map((token) => {
      if(token) {
        this.setToken(token);
        return true;
      }else{
        return false;
      }
    }))
  }

  logout(){
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    this.currentToken = undefined;
    this.loggedIn.next(false);
  }

  loadGroup(){
    const id = localStorage.getItem(SELECTED_GROUP_KEY);
    if(id) {
      this.apiService.getRecord<GamingGroup>(`gaming_groups/${id}`, {}).subscribe((response) => {
        this.currentGroup = response;
      })
    }
  }

  get currentGroup(): GamingGroup|undefined {
    return this.selectedGroup.getValue();
  }

  set currentGroup(group: GamingGroup){
    localStorage.setItem(SELECTED_GROUP_KEY, group.id);
    this.selectedGroup.next(group);
  }

  private setToken(token: string) {
    this.currentToken = token;
    localStorage.setItem(TOKEN_STORAGE_KEY, this.currentToken);
    this.loggedIn.next(true);
  }

}
