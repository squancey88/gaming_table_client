import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { TableInterfaceService } from '../table-interface.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu'; 
import { CustomComponentsModule } from '../custom-components/custom-components.module';
import { LightControllerFormsService } from '../light-controller-forms.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
   ReactiveFormsModule, CustomComponentsModule,
   MatButtonModule, MatIconModule, MatToolbarModule, MatMenuModule, MatFormFieldModule, MatInputModule,
   MatCardModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {

  chaseForm: FormGroup;
  toggleForm: FormGroup;
  health = 20;

  @ViewChild('colorPicker') colorInput?: HTMLInputElement;

  constructor(
    public tableInteface: TableInterfaceService,
    public formBuilder: FormBuilder,
    private lightForms: LightControllerFormsService
  ){
    this.chaseForm = this.lightForms.chaseForm();
    this.toggleForm = this.lightForms.toggleForm();
  }

  ngAfterViewInit(): void {

  }

  sendToggle(){
    this.tableInteface.sendLightCommand({
      type: "new",
      name: "toggle",
      params:  this.toggleForm.value
    });
  }

  sendChase(){
    this.tableInteface.sendLightCommand({
      type: "new",
      name: "chase",
      params:  this.chaseForm.value
    });
  }  
  
  sendTwinkle(){
    this.tableInteface.sendLightCommand({
      type: "new",
      name: "twinkle",
      params:  {
      }
    });
  }
}
