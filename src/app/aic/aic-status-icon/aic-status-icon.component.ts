import { Component } from '@angular/core';
import { AICService } from '../aic.service';

@Component({
  selector: 'aic-status-icon',
  templateUrl: './aic-status-icon.component.html',
  styleUrl: './aic-status-icon.component.scss'
})
export class AicStatusIconComponent {
  loggedIn = false;

  constructor(private aicService: AICService){
    this.aicService.loggedIn.subscribe((value) => {
      console.log("status in status", value)
      this.loggedIn = value
    });
  }

  tooltipText(): string{
    if(this.loggedIn){
      return "Logged in to AIC"
    } else {
      return "Not Logged in to AIC"
    }
  }

}
