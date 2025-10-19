import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableConfigService {

  ipAddress = "192.168.7.147"
  port = "6001"
  
  constructor() { 
  }

  get tableAddress(): string {
    return `http://${this.ipAddress}:${this.port}`
  }

  get statusEndPoint(): string {
    return `${this.tableAddress}/status`
  }

  get lightEndPoint(): string {
    return `${this.tableAddress}/lights`
  }

  get configEndPoint(): string {
    return `${this.tableAddress}/config`
  }


}
