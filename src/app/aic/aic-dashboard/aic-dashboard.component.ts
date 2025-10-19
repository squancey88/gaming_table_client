import { Component } from '@angular/core';
import { AICService } from '../aic.service';

@Component({
  selector: 'app-aic-dashboard',
  templateUrl: './aic-dashboard.component.html',
  styleUrl: './aic-dashboard.component.scss'
})
export class AicDashboardComponent {

  constructor(
    private aicService: AICService,
  ){
  }

  logout(){
    this.aicService.logout();
  }

}
