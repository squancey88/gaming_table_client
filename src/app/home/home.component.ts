import { Component } from '@angular/core';
import { TableInterfaceService } from '../table-interface.service';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
   ReactiveFormsModule, 
   MatButtonModule, MatIconModule, MatToolbarModule, MatMenuModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  chaseForm: FormGroup;
  health = 20;

  constructor(
    public tableInteface: TableInterfaceService,
    public formBuilder: FormBuilder
  ){
    this.chaseForm = this.formBuilder.group({
      time_per_light: new FormControl(1),
      chase_color_r: new FormControl(0),
      chase_color_g: new FormControl(255),
      chase_color_b: new FormControl(0),
    })
  }

  sendMtgHealth(){
    this.tableInteface.sendCommand({
      type: "new",
      name: "mtg_health",
      params:{
        player_positions: [1, 2, 6, 5, 3, 4],
        start_health: 20,
        light_count: 20
      }
    })
  }

  sendPlayerOneMinusLife(){
    this.health -= 1;
    this.tableInteface.sendCommand({
      type: "update",
      params:{
        player: 1,
        current_health: this.health
      }
    })

  }

  sendPlayerOnePlusLife(){
    this.health += 1;
    this.tableInteface.sendCommand({
      type: "update",
      params:{
        player: 1,
        current_health: this.health
      }
    })

  }

  sendToggle(){
    this.tableInteface.sendCommand({
      type: "new",
      name: "toggle",
      params:  {
        start:[255, 0, 0],
        end: [0, 0, 255],
        time: 6
      }
    });
  }

  sendChase(){
    const time_per_light = this.chaseForm.get('time_per_light')?.value;
    const chase_color_r = this.chaseForm.get('chase_color_r')?.value;
    const chase_color_g = this.chaseForm.get('chase_color_g')?.value;
    const chase_color_b = this.chaseForm.get('chase_color_b')?.value;
    this.tableInteface.sendCommand({
      type: "new",
      name: "chase",
      params:  {
        background_color: [0, 0, 0],
        chase_color: [chase_color_r, chase_color_g, chase_color_b],
        time_per_light: time_per_light
      }
    });
  }
}
