import { Component } from '@angular/core';
import { AICService } from '../aic.service';
import { GamingGroup, GamingSession } from '../aic.interfaces';

@Component({
  selector: 'aic-status-card',
  templateUrl: './aic-status-card.component.html',
  styleUrl: './aic-status-card.component.scss'
})
export class AicStatusCardComponent {
  loggedIn = false
  currentGroup?: GamingGroup;
  currentSession?: GamingSession;

  constructor(private aicService: AICService){
    this.aicService.loggedIn.subscribe((value) => {
      console.log("status in status", value)
      this.loggedIn = value
    });
    this.aicService.selectedGroup.subscribe(x => this.currentGroup = x)
    this.aicService.selectedSession.subscribe(x => this.currentSession = x)
  }
}
