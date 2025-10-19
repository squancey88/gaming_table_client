import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TableInterfaceService } from '../table/table-interface.service';
import { CommonModule } from '@angular/common';
import { GameCache, HealthChange, MTGGameInstance, MTGPlayer, TimeEvent } from '../data-interfaces';
import { StorageService } from '../storage.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatButtonModule } from '@angular/material/button';
import humanizeDuration from 'humanize-duration';
import { GamesApiService } from '../aic/api/games-api.service';

interface CommanderTracking {
  playerIndex: number,
  name: string,
  totalDamage: number
}

@Component({
  selector: 'app-mtg-health-game-runner',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatIconModule,
    MatSelectModule, MatInputModule, MatCheckboxModule,
    MatButtonModule,
    CommonModule],
  templateUrl: './mtg-health-game-runner.component.html',
  styleUrl: './mtg-health-game-runner.component.scss'
})
export class MtgHealthGameRunnerComponent implements OnChanges  {

  damageForm: FormGroup;
  healingForm: FormGroup;

  gameData: MTGGameInstance;
  playerData: Array<{
    player: MTGPlayer,
    currentHealth: number,
    totalTime: string,
    commanderDamage: Array<CommanderTracking>
  }> = [];
  currentPlayer = 0;
  turnLength = "";
  currentTurn?: TimeEvent;
  paused = false;

  @Input() gameId: string = "";

  constructor(
    private tableInterface: TableInterfaceService,
    private storageService: StorageService,
    private gameApi: GamesApiService,
    private cdr: ChangeDetectorRef,
    formBuilder: FormBuilder
  ) {
    this.gameData = {} as MTGGameInstance;
    this.damageForm = formBuilder.group({
      target_player_index: new FormControl(),
      source_player_index: new FormControl(),
      commander: new FormControl(),
      change: new FormControl()
    })
    this.healingForm = formBuilder.group({
      target_player_index: new FormControl(),
      source_player_index: new FormControl(null),
      commander: new FormControl(false),
      change: new FormControl()
    })
    setInterval(() => { this.updateTimer() }, 500)
  }

  startTurn(){
    this.currentTurn = {
      start_time: new Date(),
      current_player_index: this.currentPlayer
    }
  }

  updateTimer(){
    if (this.currentTurn)
      this.turnLength = humanizeDuration(new Date().getTime() - this.currentTurn?.start_time.getTime());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['gameId']) {
      const cache = this.storageService.loadGame(this.gameId);
      if (cache) {
        this.gameData = cache.data
        this.startGame();
      }
    }
  }

  startGame(){
    const commanderTracking = this.gameData.players.map((item, pindex) => {
      return {
        playerIndex: pindex,
        totalDamage: 0,
        name: item.name
      }
    })
    this.gameData.players.forEach((player, index) => {
      this.playerData.push({
        player: player,
        currentHealth: this.gameData.start_health,
        totalTime: "",
        commanderDamage: commanderTracking.filter((item) => item.playerIndex != index)
      })
    });

    this.recalculateChanges();
    this.sendStartCommand()
    this.playerTimeCalculation();
    this.startTurn()
    this.gameData.players.forEach((player, index) => {
      this.playerCommanderDamageCalcs(index);
    });
  }

  recalculateChanges(){
    this.playerData.forEach((player) => player.currentHealth = this.gameData.start_health)
    this.gameData.health_changes.forEach((change) => this.processChange(change))
  }

  nextTurn(){
    this.paused = false;
    this.saveTurn();
    this.currentPlayer++;
    if(this.currentPlayer == this.playerData.length){
      this.currentPlayer = 0;
    }
    this.playerTimeCalculation()
    this.startTurn();
    this.tableInterface.sendLightUpdate({
      current_turn: this.playerData[this.currentPlayer].player.table_seat
    });
  }

  pause(){
    this.saveTurn();
    this.playerTimeCalculation()
    this.paused = true;
    this.currentTurn = {
      current_player_index: undefined,
      start_time: new Date()
    }
  }

  unpause(){
    this.paused = false;
    this.saveTurn();
    this.startTurn();
  }

  saveTurn() {
    if(this.currentTurn) {
      this.currentTurn.end_time = new Date();
      this.gameData.turn_tracking.push(this.currentTurn);
      this.saveGame();
    }
  }

  doDamage() {
    const change = this.damageForm.value;
    change.change = (-change.change);
    this.applyChange(change);
    this.damageForm.reset();
    if (change.target_player_index === "others"){
      this.getOthersIndex(change.source_player_index).forEach((i) => this.playerCommanderDamageCalcs(i));
    } else {
      this.playerCommanderDamageCalcs(change.target_player_index);
    }
  }

  doHeal() {
    const change = this.healingForm.value;
    this.applyChange(change)
    this.healingForm.reset();
  }

  applyChange(change: HealthChange) {
    if(change.target_player_index === "others") {
      this.getOthersIndex(change.source_player_index).forEach((i) => {
        const newChange = {...change}
        newChange.target_player_index = i;
        newChange.at = new Date();
        this.processChange(newChange);
        this.gameData.health_changes.push(newChange);
        this.saveGame();
      });
    } else {
      change.at = new Date();
      this.processChange(change);
      this.gameData.health_changes.push(change);
      this.saveGame();
    }
  }

  undoChange(reversedIndex: number) {
    const index = this.gameData.health_changes.length - reversedIndex - 1;
    if(confirm("Are you sure?")) {
      const change = this.gameData.health_changes.splice(index, 1)[0];
      this.playerCommanderDamageCalcs(change.target_player_index);
      this.recalculateChanges();
      this.saveGame();
    }
  }

  saveGame(){
    this.storageService.saveGame({
      id: this.gameId,
      type: 'mtg',
      data: this.gameData
    } as GameCache);
    this.sendTableUpdate();
    if(this.gameData.aic_id) {
      this.gameApi.update(this.gameData.aic_id, {data: this.gameData}).subscribe((response) => {
        console.log(response);
      });
    }
  }

  processChange(change: HealthChange){
    this.playerData[+change.target_player_index].currentHealth += change.change;
  }

  playerCommanderDamageCalcs(playerIndex: number | "others"){
    if(playerIndex == "others") { return }
    console.log('Doing commander updates', playerIndex);
    const player = this.playerData[playerIndex];
    const commanderData: Array<CommanderTracking> = []
    this.playerData.forEach((otherPlayer, oIndex) => {
      if(oIndex == playerIndex) return;

      const commanderChanges = this.gameData.health_changes.filter((item) => item.commander && item.target_player_index == playerIndex && item.source_player_index == oIndex);
      let totalDamage
      if(commanderChanges.length > 0) {
        totalDamage = commanderChanges.reduce((prev, current) => {
          return prev - current.change;
        }, 0);
      } else {
        totalDamage = 0
      }
      commanderData.push({
        name: otherPlayer.player.name,
        totalDamage: totalDamage,
        playerIndex: oIndex
      })
    });
    player.commanderDamage = commanderData;
  }

  playerTimeCalculation(){
    this.playerData.forEach((player, index) => {
      const timeRecords = this.gameData.turn_tracking.filter((item) => item.current_player_index == index);
      player.totalTime = humanizeDuration(timeRecords.reduce((prev, current) => {
        let diff;
        if(current.end_time) {
          diff = (new Date(current.end_time).getTime() - new Date(current.start_time).getTime());
        } else {
          diff = 0
        }
        return prev + diff;
      }, 0))
    });

  }

  sendTableUpdate() {
    const player_data = this.playerData.map((player) => {
      return {
        player: player.player.table_seat,
        current_health: player.currentHealth
      }
    })
    this.tableInterface.sendLightUpdate({ player_data: player_data });
  }

  sendStartCommand(){
    this.tableInterface.startMTGHealth({
      player_positions: this.gameData.players.map((value) => {
        return {
          position: value.table_seat,
          background_color: "#909090"
        }
      }),
      start_health: this.gameData.start_health,
      light_count: 20,
      start_seat: this.gameData.players[0].table_seat
    });
    this.sendTableUpdate();
  }

  getOthersIndex(index: Number): Array<number> {
    const length = this.playerData.length
    return Array.from({ length }, (_, i) => i).filter(i => i !== index);
  }
}
