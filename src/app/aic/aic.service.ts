import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AICCommonFields, GamingGroup } from './aic.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AICService {

  readonly tokenKey = 'aic_token';

  public loggedIn = new BehaviorSubject<boolean>(false);
  private currentToken?: string = undefined;
  public selectedGroup = new BehaviorSubject<GamingGroup|undefined>(undefined);

  constructor(private httpClient: HttpClient) { 
    this.loggedIn.subscribe((status) => {
      console.log("logged in status", status)
    });
    const token = localStorage.getItem(this.tokenKey)
    if(token){
      this.currentToken = token;
      this.loggedIn.next(true);
    }
  }

  login(loginData: {email: string, password: string}): Observable<boolean> {
    return this.httpClient.post<{token: string}>(this.toUrl('auth/authenticate_token'), loginData)
      .pipe(map((response) => {
        if(response.token){
          this.setToken(response.token);
          return true
        } else {
          return false;
        }
      }));
  }

  logout(){
    localStorage.removeItem(this.tokenKey);
    this.currentToken = undefined;
    this.loggedIn.next(false);
  }

  get currentGroup(): GamingGroup|undefined {
    return this.selectedGroup.getValue();
  }

  set currentGroup(group: GamingGroup){
    this.selectedGroup.next(group);
  }

  getRecords<T extends AICCommonFields>(endPoint: string, params?: any): Observable<Array<T>>{
    return this.httpClient.get<Array<T>>(this.toUrl(endPoint), {
      params: params,
      headers: {
        "Authorization": `Bearer ${this.currentToken}`
      }
    }).pipe(map((value) => this.processApiData<T>(value)));
  }

  getRecord<T extends AICCommonFields>(endPoint: string, params: any): Observable<T> {
    return this.httpClient.get<T>(this.toUrl(endPoint), {
      params: params,
      headers: {
        "Authorization": `Bearer ${this.currentToken}`
      }
    }).pipe(map((value) => this.processDates<T>(value)));
  }

  private setToken(token: string) {
    this.currentToken = token;
    localStorage.setItem(this.tokenKey, this.currentToken);
    this.loggedIn.next(true);
  }

  private toUrl(endPoint: string):string {
    return `${environment.aicServer}/${endPoint}.json`;
  }
  
  private processApiData<T extends AICCommonFields>(values: Array<T>): Array<T> {  
    return values.map((i) => this.processDates(i));
  }

  private processDates<T extends AICCommonFields>(value: T): T {
    value.created = new Date(value.created_at);
    value.updated = new Date(value.updated_at);
    return value;
  }

}
