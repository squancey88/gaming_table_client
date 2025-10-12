import { Component, OnInit } from '@angular/core';
import { AICService } from '../aic.service';
import { GamingGroup, User, GamingSession } from '../aic.interfaces';

@Component({
  selector: 'app-aic-status',
  templateUrl: './aic-status.component.html',
  styleUrl: './aic-status.component.scss'
})
export class AicStatusComponent implements OnInit {

  loggedIn = false;
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

  ngOnInit(): void {
  }

  tooltipText(): string{
    if(this.loggedIn){
      return "Logged in to AIC"
    } else {
      return "Not Logged in to AIC"
    }
  }
}
