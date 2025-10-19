import { Component, OnInit} from '@angular/core';
import { TableInterfaceService } from '../table/table-interface.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CustomComponentsModule } from '../custom-components/custom-components.module';
import { GameRunnner } from '../game-runner';
import { AicModule } from "../aic/aic.module";
import { MtgHealthGameRunnerComponent } from "../mtg-health-game-runner/mtg-health-game-runner.component";
import { GameCache, MTGGameInstance, MTGPlayer } from '../data-interfaces';
import { StorageService } from '../storage.service';
import { User } from '../aic/aic.interfaces';
import { AICService } from '../aic/aic.service';
import { GamesApiService, GameData } from '../aic/api/games-api.service';

@Component({
  selector: 'app-mtg-health',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, CustomComponentsModule,
    MatInputModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatSelectModule, MatListModule,
    MatCheckboxModule,
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
  validGame = true;

  constructor(
    private tableInteface: TableInterfaceService,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private aicService: AICService,
    private gameApi: GamesApiService
  ){
    super();
    this.startForm = this.formBuilder.group({
      start_health: new FormControl(20),
      add_to_aic: new FormControl(false),
      players: new FormArray([])
    })
    this.loadGames();
    this.startForm.valueChanges.subscribe(changes => {
      if(changes.add_to_aic) {
        if(this.aicService.currentSession === undefined) {
          this.validGame = false;
        }
      } else {
        this.validGame = true;
      }
    });
  }

  ngOnInit(): void {
    if(this.tableInteface.connected.getValue()){
      this.setPositions();
    } else {
      this.tableInteface.configLoaded.asObservable().subscribe((value) => {
        if(value){
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
    if(data.add_to_aic) {
      this.setupAICGame(data);
    } else {
      this.setupGameData(data);
    }
  }

  private setupAICGame(data: any) {
    const gameSystem = this.aicService.getGameSystemBySlug('mtg');
    if(gameSystem && this.aicService.currentSession) {
      const gameData = {
        game_system_id: gameSystem.id,
        gaming_session_id: this.aicService.currentSession.id,
        players_attributes: data.players.map((item: any) => {
          return {
            controller_id: item.player_id,
            controller_type: "User"
          };
        })
      };
      this.gameApi.createGame(gameData as GameData).subscribe((game) => {
        this.setupGameData(data, game.id);
      })
    }
  }

  private setupGameData(data: any, aicId?: string) {
    const gamePlayers = data.players.map((item: any) => {
      const player: MTGPlayer = {
        name: item.player_name,
        table_seat: item.position,
        aic_id: item.player_id
      }
      return player;
    });

    const gameData: MTGGameInstance = {
      started: new Date(),
      players: gamePlayers,
      data_version: "v1",
      aic_id: aicId,
      start_health: Number(data.start_health),
      health_changes: [],
      turn_tracking: []
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
