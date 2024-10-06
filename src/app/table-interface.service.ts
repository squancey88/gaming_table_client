import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableConfigService } from './table-config.service';
import { TableConfig, TableStatus } from './table.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableInterfaceService {

  config?: TableConfig;
  currentStatus?: TableStatus;
  connected: BehaviorSubject<boolean> = new BehaviorSubject(false);
  configLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);
  statusInterval = 10 * 1000; // One minute
  firstConnection = true;
  
  constructor(
    private configService: TableConfigService,
    private httpClient: HttpClient
  ) {
    console.log("creating table interface service")
    setInterval(() => this.getStatus(), this.statusInterval)
    this.getStatus();
  }

  getStatus(){
    this.httpClient.get<TableStatus>(this.configService.statusEndPoint).subscribe({
      next: (status) => { 
        this.currentStatus = status;
        if(this.firstConnection){
          this.getConfig();
          this.firstConnection = false
        }
        this.connected.next(true);
       },
      error: () => { 
        console.log('no connection')
        this.connected.next(false);
        this.configLoaded.next(false);
        this.firstConnection = true;
       }
    })
  }

  getConfig(){
    this.httpClient.get<TableConfig>(this.configService.configEndPoint).subscribe((config) => {
      this.config = config;
      this.configLoaded.next(true);
    });
  }

  sendLightCommand(command: any) {
    this.httpClient.post(this.configService.lightEndPoint, command).subscribe((response) => {
      console.log(response);
    })
  }
}
