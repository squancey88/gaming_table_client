import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AICCommonFields, TOKEN_STORAGE_KEY} from './aic.interfaces';
import { Login } from '../data-interfaces';

@Injectable({
  providedIn: 'root'
})
export class AicApiService {

  currentToken?: string;

  constructor(
    private httpClient: HttpClient
  ) {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (token) this.currentToken = token;
  }

  login(loginData: Login): Observable<string|null> {
    return this.httpClient.post<{token: string}>(this.loginUrl(), loginData)
      .pipe(map((response) => {
        if(response.token){
          this.currentToken = response.token;
          return response.token;
        } else {
          return null;
        }
      }));
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

  doPost<T extends AICCommonFields>(endPoint: string, params: any): Observable<T> {
    return this.httpClient.post<T>(this.toUrl(endPoint), params,
     {
      headers: {
        "Authorization": `Bearer ${this.currentToken}`
      }
    }).pipe(map((value) => this.processDates<T>(value)));
  }

  doPatch<T extends AICCommonFields>(endPoint: string, params: any): Observable<T> {
    return this.httpClient.patch<T>(this.toUrl(endPoint), params,
     {
      headers: {
        "Authorization": `Bearer ${this.currentToken}`
      }
    }).pipe(map((value) => this.processDates<T>(value)));
  }

  private toUrl(endPoint: string): string {
    return `${environment.aicServer}/api/${endPoint}`;
  }

  private loginUrl():string {
    return `${environment.aicServer}/auth/authenticate_token.json`;
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
