import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AICService } from '../aic.service';
import { GamingGroup } from '../aic.interfaces';

@Component({
  selector: 'app-aic-login',
  templateUrl: './aic-login.component.html',
  styleUrl: './aic-login.component.scss'
})
export class AICLoginComponent {

  loginForm: FormGroup;
  loggedIn = false;
  groups: Array<GamingGroup> = [];

  constructor(
    private aicService: AICService,
    private formBuilder: FormBuilder,
  ){
    this.loginForm = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl()
    });
    this.aicService.loggedIn.subscribe(value => {
      this.loggedIn = value;
      if(value){
        this.getGamingGroups();
      }
    });
  }

  login(){
    this.aicService.login(this.loginForm.value).subscribe((success) => {
      this.loggedIn = success;
    });
  }

  logout(){
    this.groups = [];
    this.aicService.logout();
  }

  getGamingGroups(){
    this.aicService.getRecords<GamingGroup>('gaming_groups', {}).subscribe((response) => {
      this.groups = response;
      console.log(response);
    });
  }
  
  setGroup(group: GamingGroup){
    this.aicService.currentGroup = group;
  }

}
