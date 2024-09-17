import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TableInterfaceService {

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) {
  }

  sendCommand(command: any) {
    this.httpClient.post(this.configService.getAddress(), command).subscribe((response) => {
      console.log(response);
    })
  }
}
