import { Component } from '@angular/core';
import { GamingGroup } from '../aic.interfaces';
import { AICService } from '../aic.service';
import { GamingGroupsApiService } from '../api/gaming-groups-api.service';

@Component({
  selector: 'aic-group-select',
  templateUrl: './group-select.component.html',
  styleUrl: './group-select.component.scss'
})
export class GroupSelectComponent {

  groups: Array<GamingGroup> = [];
  selectedGroup?: GamingGroup;

  constructor(
    private aicService: AICService,
    private apiService: GamingGroupsApiService
  ){
    this.getGamingGroups();
    this.aicService.selectedGroup.subscribe(value => {
      if(value)
        this.selectedGroup = value;
    })
  }

  getGamingGroups(){
    this.apiService.index().subscribe((response) => {
      this.groups = response;
    });
  }

  setGroup(group: GamingGroup){
    this.aicService.currentGroup = group;
    this.selectedGroup = group;
  }
}
