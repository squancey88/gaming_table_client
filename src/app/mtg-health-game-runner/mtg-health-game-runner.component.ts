import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TableInterfaceService } from '../table-interface.service';
import { CommonModule } from '@angular/common';
import { GameCache, HealthChange, MTGGameInstance, MTGPlayer, TimeEvent } from '../data-interfaces';
import { StorageService } from '../storage.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatButtonModule } from '@angular/material/button';
import humanizeDuration from 'humanize-duration';

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
    private cdr: ChangeDetectorRef,
    formBuilder: FormBuilder
  ) {
    this.gameData = {} as MTGGameInstance;
    this.damageForm = formBuilder.group({
      targetPlayerIndex: new FormControl(),
      sourcePlayerIndex: new FormControl(),
      commander: new FormControl(),
      change: new FormControl()
    })
    this.healingForm = formBuilder.group({
      targetPlayerIndex: new FormControl(),
      sourcePlayerIndex: new FormControl(null),
      commander: new FormControl(false),
      change: new FormControl()
    })
    setInterval(() => { this.updateTimer() }, 500)
  }

  startTurn(){
    this.currentTurn = {
      startTime: new Date(),
      currentPlayerIndex: this.currentPlayer
    }
  }

  updateTimer(){
    if (this.currentTurn)
      this.turnLength = humanizeDuration(new Date().getTime() - this.currentTurn?.startTime.getTime());
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
        currentHealth: this.gameData.startHealth,
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
    this.playerData.forEach((player) => player.currentHealth = this.gameData.startHealth)
    this.gameData.healthChanges.forEach((change) => this.processChange(change))
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
    this.tableInterface.sendLightCommand({
      type: "update",
      params: {
        current_turn: this.playerData[this.currentPlayer].player.tableSeat
      }
    });
  }

  pause(){
    this.saveTurn();
    this.playerTimeCalculation()
    this.paused = true;
    this.currentTurn = {
      currentPlayerIndex: undefined,
      startTime: new Date()
    }
  }

  unpause(){
    this.paused = false;
    this.saveTurn();
    this.startTurn();
  }

  saveTurn() {
    if(this.currentTurn) {
      this.currentTurn.endTime = new Date();
      this.gameData.timeTracking.push(this.currentTurn);
      this.saveGame();
    }
  }

  doDamage() {
    const change = this.damageForm.value;
    change.change = (-change.change);
    console.log(change);
    this.applyChange(change);
    this.damageForm.reset();
    this.playerCommanderDamageCalcs(change.targetPlayerIndex);
  }

  doHeal() {
    const change = this.healingForm.value;
    this.applyChange(change)
    this.healingForm.reset();
  }

  applyChange(change: HealthChange) {
    change.at = new Date();
    this.processChange(change);
    this.gameData.healthChanges.push(change);
    this.saveGame();
  }

  undoChange(reversedIndex: number) {
    const index = this.gameData.healthChanges.length - reversedIndex - 1;
    if(confirm("Are you sure?")) {
      const change = this.gameData.healthChanges.splice(index, 1)[0];
      this.playerCommanderDamageCalcs(change.targetPlayerIndex);
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
  }

  processChange(change: HealthChange){
    this.playerData[change.targetPlayerIndex].currentHealth += change.change;
  }

  playerCommanderDamageCalcs(playerIndex: number){
    const player = this.playerData[playerIndex];
    const commanderData: Array<CommanderTracking> = []
    this.playerData.forEach((otherPlayer, oIndex) => {
      if(oIndex == playerIndex) return;

      const commanderChanges = this.gameData.healthChanges.filter((item) => item.commander && item.targetPlayerIndex == playerIndex && item.sourcePlayerIndex == oIndex);
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
      const timeRecords = this.gameData.timeTracking.filter((item) => item.currentPlayerIndex == index);
      player.totalTime = humanizeDuration(timeRecords.reduce((prev, current) => {
        let diff;
        if(current.endTime) {
          diff = (new Date(current.endTime).getTime() - new Date(current.startTime).getTime());
        } else {
          diff = 0
        }
        return prev + diff;
      }, 0))
    });

  }

  sendTableUpdate() {
    const player_data = new Array();
    this.playerData.forEach((player) => {
      player_data.push(
        {
          player: player.player.tableSeat,
          current_health: player.currentHealth
        }
      );
    })
    this.tableInterface.sendLightCommand({
      type: "update",
      params: {
        player_data: player_data
      }
    });
  }

  sendStartCommand(){
    this.tableInterface.sendLightCommand({
      type: "new",
      name: "mtg_health",
      params:{
        player_positions: this.gameData.players.map((value) => { 
          return {
            position: value.tableSeat, 
            background_color: "#909090"
          }
        }),
        start_health: this.gameData.startHealth,
        light_count: 20,
        start_seat: this.gameData.players[0].tableSeat
      }
    })
    this.sendTableUpdate();
  }

}


