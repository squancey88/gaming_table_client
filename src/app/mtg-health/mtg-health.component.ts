import { Component } from '@angular/core';
import { TableInterfaceService } from '../table-interface.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; 
import { MatIconModule } from '@angular/material/icon';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-mtg-health',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule,
    MatInputModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatSelectModule
  ],
  templateUrl: './mtg-health.component.html',
  styleUrl: './mtg-health.component.scss'
})
export class MtgHealthComponent {

  gameInProgress = false

  startForm: FormGroup;
  gameForm!: FormGroup;
  public availablePositions = Array(6).fill(0).map((x,i)=>i+1);
  gamePlayers: Array<{position: number, player_name: string}> = [];

  constructor(
    public tableInteface: TableInterfaceService,
    public formBuilder: FormBuilder
  ){
    this.startForm = this.formBuilder.group({
      start_health: new FormControl(20),
      players: new FormArray([])
    })
  }

  get startPlayerRows() {
    return this.startForm.get("players") as FormArray;
  }

  addPlayer() {
    this.startPlayerRows.push(this.formBuilder.group({
      position: new FormControl(),
      player_name: new FormControl()
    }));
  }

  get playerRows() {
    return this.gameForm.get('player_data') as FormArray;
  }

  start(){
    const data = this.startForm.value;
    this.gamePlayers = data.players;
    this.tableInteface.sendCommand({
      type: "new",
      name: "mtg_health",
      params:{
        player_positions: this.gamePlayers,
        start_health: data.start_health,
        light_count: 20
      }
    });
    const playerControlArray = this.formBuilder.array(this.gamePlayers.map((player) => {
        return this.formBuilder.group({
          player: new FormControl(player.position),
          player_name: new FormControl(player.player_name),
          current_health: new FormControl(data.start_health)
        })
      })
    );
    this.gameForm = this.formBuilder.group({
      player_data: playerControlArray
    });
    this.gameForm.valueChanges.pipe(debounceTime(1000)).subscribe((updated) => {
      const updates = this.gameForm.value
      console.log(updates);
      this.tableInteface.sendCommand({
        type: "update",
        params: updates
      });
    });
    this.gameInProgress = true;
  }

  addHealth(index: number){
    const control = this.playerRows.controls[index].get("current_health")
    if(control){
      const current_health = parseInt(control.value)
      control.setValue(current_health + 1)
    }
  }

  removeHealth(index: number){
    const control = this.playerRows.controls[index].get("current_health")
    if(control){
      const current_health = parseInt(control.value)
      control.setValue(current_health - 1)
    }
  }


}
