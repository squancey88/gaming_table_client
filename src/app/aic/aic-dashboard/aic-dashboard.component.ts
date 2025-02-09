import { Component } from '@angular/core';
import { GamingGroup, GamingSession } from '../aic.interfaces';
import { AICService } from '../aic.service';
import { AicApiService } from '../aic-api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aic-dashboard',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatButtonModule, CommonModule],
  templateUrl: './aic-dashboard.component.html',
  styleUrl: './aic-dashboard.component.scss'
})
export class AicDashboardComponent {

  groups: Array<GamingGroup> = [];
  selectedGroup?: GamingGroup;
  sessions: Array<GamingSession> = []

  constructor(
    private aicService: AICService,
    private apiService: AicApiService,
  ){
    this.getGamingGroups();
    this.aicService.selectedGroup.subscribe(value => {
      if(value)
        this.selectedGroup = value;
    })
  }

  logout(){
    this.groups = [];
    this.aicService.logout();
  }

  getGamingGroups(){
    this.apiService.getRecords<GamingGroup>('gaming_groups', {}).subscribe((response) => {
      this.groups = response;
    });
  }

  getCurrentSessions() {
    this.apiService.getRecords<GamingSession>(`gaming_groups/${this.selectedGroup?.id}/gaming_sessions`,
      {}
    ).subscribe((response) => {
      this.sessions = response;
    });
  }
  
  setGroup(group: GamingGroup){
    this.aicService.currentGroup = group;
    this.selectedGroup = group;
    this.getCurrentSessions();
  }
}
