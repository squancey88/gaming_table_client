import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  
  constructor() { 
  }

  getAddress(){
    return "http://192.168.7.147:6001"
  }

}
