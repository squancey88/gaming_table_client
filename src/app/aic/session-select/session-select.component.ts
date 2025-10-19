import { Component } from '@angular/core';
import { GamingGroup, GamingSession } from '../aic.interfaces';
import { AICService } from '../aic.service';
import { GamingSessionsApiService } from '../api/gaming-sessions-api.service';

@Component({
  selector: 'aic-session-select',
  templateUrl: './session-select.component.html',
  styleUrl: './session-select.component.scss'
})
export class SessionSelectComponent {

  selectedGroup?: GamingGroup;
  sessions: Array<GamingSession> = []

  constructor(
    private aicService: AICService,
    private apiService: GamingSessionsApiService,
  ){
    this.aicService.selectedGroup.subscribe(value => {
      if(value)
        this.selectedGroup = value;
        this.getSessions();
    })
  }

  createSession() {
    if (this.selectedGroup) {
      this.apiService.create(this.selectedGroup, { start_time: new Date().toISOString() })
        .subscribe(
          (response) => {
            this.getSessions();
            this.selectSession(response);
          }
        );
    }
  }

  selectSession(session: GamingSession) {
    this.aicService.currentSession = session;
  }

  getSessions() {
    if(this.selectedGroup) {
      this.apiService.index(this.selectedGroup)
      .subscribe((response) => {
        this.sessions = response;
      });
    }
  }
}

