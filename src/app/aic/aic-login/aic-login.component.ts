import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AICService } from '../aic.service';
import { AicApiService } from '../aic-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aic-login',
  templateUrl: './aic-login.component.html',
  styleUrl: './aic-login.component.scss'
})
export class AICLoginComponent {

  loginForm: FormGroup;
  loggedIn = false;

  constructor(
    private aicService: AICService,
    private formBuilder: FormBuilder,
    private router: Router
  ){
    this.loginForm = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl()
    });
    this.aicService.loggedIn.subscribe(value => {
      if(value)
        this.router.navigate(["aic-dashboard"])
    });
  }

  login(){
    this.aicService.login(this.loginForm.value).subscribe((success) => {
      this.loggedIn = success;
      this.router.navigate(["aic-dashboard"])
    });
  }
}
