import { Component, OnInit} from '@angular/core';
import { TableInterfaceService } from '../table-interface.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; 
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CustomComponentsModule } from '../custom-components/custom-components.module';
import { GameRunnner } from '../game-runner';
import { AicModule } from "../aic/aic.module";
import { MtgHealthGameRunnerComponent } from "../mtg-health-game-runner/mtg-health-game-runner.component";
import { GameCache, MTGGameInstance, MTGPlayer } from '../data-interfaces';
import { StorageService } from '../storage.service';
import { User } from '../aic/aic.interfaces';

@Component({
  selector: 'app-mtg-health',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, CustomComponentsModule,
    MatInputModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatSelectModule, MatListModule,
    AicModule,
    MtgHealthGameRunnerComponent
],
  templateUrl: './mtg-health.component.html',
  styleUrl: './mtg-health.component.scss'
})
export class MtgHealthComponent extends GameRunnner implements OnInit {

  gameInProgress = false

  startForm: FormGroup;
  public availablePositions?: number[];
  cachedGames!: Array<GameCache>;
  selectedGameId: string = '';

  constructor(
    private tableInteface: TableInterfaceService,
    private formBuilder: FormBuilder,
    private storageService: StorageService
  ){
    super();
    this.startForm = this.formBuilder.group({
      start_health: new FormControl(20),
      players: new FormArray([])
    })
    this.loadGames();
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

  loadGames(){
    this.cachedGames = this.storageService.gamesByType("mtg");
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
      player_id: new FormControl(),
      background_color: new FormControl()
    }));
  }

  setName(user: User, index: number) {
    this.startPlayerRows.controls[index].patchValue({player_name: user.display_name})
  }

  create(){
    const data = this.startForm.value;
    const gamePlayers = data.players.map((item: any) => {
      const player: MTGPlayer = {
        name: item.player_name,
        tableSeat: item.position,
        aicId: item.player_id
      }
      return player;
    });

    const gameData: MTGGameInstance = {
      started: new Date(),
      players: gamePlayers,
      startHealth: Number(data.start_health),
      healthChanges: [],
      timeTracking: []
    }

    const id = this.storageService.saveGame({
      type: "mtg",
      data: gameData,
    } as GameCache);

    this.startGame(id);
  }

  startGame(id: string) {
    this.selectedGameId = id;
    this.gameInProgress = true;
  }
  
  deleteGame(id: string) {
    if(confirm("Are you sure?")){
      this.storageService.deleteGame(id);
      this.loadGames();
    }
  }
}
