import { Component, OnInit} from '@angular/core';
import { TableInterfaceService } from '../table-interface.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; 
import { MatIconModule } from '@angular/material/icon';
import { debounceTime } from 'rxjs';
import { CustomComponentsModule } from '../custom-components/custom-components.module';
import { GameRunnner } from '../game-runner';

@Component({
  selector: 'app-mtg-health',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, CustomComponentsModule,
    MatInputModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatSelectModule
  ],
  templateUrl: './mtg-health.component.html',
  styleUrl: './mtg-health.component.scss'
})
export class MtgHealthComponent extends GameRunnner implements OnInit {


  gameInProgress = false

  startForm: FormGroup;
  gameForm!: FormGroup;
  damageForm: FormGroup;
  gamePlayers: Array<{position: number, player_name: string, background_color: string}> = [];
  public availablePositions?: number[];
  damageEvents: Array<{attacker: string, defender: string, damage: number}> = [];


  constructor(
    private tableInteface: TableInterfaceService,
    private formBuilder: FormBuilder
  ){
    super();
    this.startForm = this.formBuilder.group({
      start_health: new FormControl(20),
      players: new FormArray([])
    })
    this.damageForm = this.formBuilder.group({
      attacker: new FormControl(), defender: new FormControl(), damage: new FormControl(), is_commander: new FormControl(false)
    })
    
    // Temp code
    this.gameForm = this.formBuilder.group({
      player_data: this.formBuilder.array([
        this.setupPlayer(1, "p1", 20),
        this.setupPlayer(2, "p2", 20)
      ])
    });
    console.log(this.gameForm);
    this.gameInProgress = true;
    }

  ngOnInit(): void {
    if(this.tableInteface.connected.getValue()){
      this.setPositions();
    } else {
      this.tableInteface.configLoaded.asObservable().subscribe((value) => {
        if(value){
          console.log("setting position");
          this.setPositions();
        }
      });
    }

  
  }

  gameRunning(): boolean {
    return this.gameInProgress; 
  }

  setPositions() {
    this.availablePositions = Array(this.tableInteface.config?.seats).fill(0).map((x,i)=>i+1);
  }

  get startPlayerRows() {
    return this.startForm.get("players") as FormArray;
  }

  addPlayer() {
    this.startPlayerRows.push(this.formBuilder.group({
      position: new FormControl(),
      player_name: new FormControl(),
      background_color: new FormControl()
    }));
  }

  get playerRows() {
    return this.gameForm.get('player_data') as FormArray;
  }

  sendStartCommand(data: any){
    this.tableInteface.sendLightCommand({
      type: "new",
      name: "mtg_health",
      params:{
        player_positions: this.gamePlayers.map((value) => { 
          return {
            position: value.position, 
            background_color: value.background_color
          }
        }),
        start_health: data.start_health,
        light_count: 20
      }
    });
  }

  setupPlayer(position: number, name: string, start_health: number){
    return this.formBuilder.group({
      player: new FormControl(position),
      player_name: new FormControl(name),
      current_health: new FormControl(start_health)
    });
  }

  start(){
    const data = this.startForm.value;
    this.gamePlayers = data.players;
    this.sendStartCommand(data);
    const playerControlArray = this.formBuilder.array(this.gamePlayers.map((player) => {
      return this.setupPlayer(player.position, player.player_name, data.start_health)
    }));
    this.gameForm = this.formBuilder.group({
      player_data: playerControlArray
    });
    this.gameForm.valueChanges.pipe(debounceTime(500)).subscribe((updated) => {
      const updates = this.gameForm.value
      console.log(updates);
      this.tableInteface.sendLightCommand({
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

  doDamage() {
    const damage = this.damageForm.get("damage")?.value;
    console.log(damage);
    const defender = this.damageForm.get("defender")?.value;
    console.log(defender);
    const attacker = this.damageForm.get("attacker")?.value;
    console.log(attacker);
    const playerHealthControl = this.playerRows.controls[defender].get("current_health");
    if(playerHealthControl){
      const currentHealth = parseInt(playerHealthControl.value);
      playerHealthControl.setValue(currentHealth - damage);
      this.damageEvents.push({
        attacker: this.getPlayerName(attacker),
        defender: this.getPlayerName(defender),
        damage: damage
      });
    }

  }

  getPlayerName(index: number): string{
    const name = this.playerRows.controls[index].get("player_name")?.value;
    return name;
  }

}
