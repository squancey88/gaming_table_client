import { Component, ViewChild } from '@angular/core';
import { TableInterfaceService } from '../table-interface.service';
import { FormGroup } from '@angular/forms';
import { LightControllerFormsService } from '../../light-controller-forms.service';

@Component({
  selector: 'app-light-controls',
  templateUrl: './light-controls.component.html',
  styleUrl: './light-controls.component.scss'
})
export class LightControlsComponent {
  chaseForm: FormGroup;
  toggleForm: FormGroup;

  @ViewChild('colorPicker') colorInput?: HTMLInputElement;

  constructor(
    public tableInteface: TableInterfaceService,
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
