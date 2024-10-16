import { CanDeactivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { GameRunnner } from "../game-runner";

@Injectable()
export class GameRunnerGuard implements CanDeactivate<GameRunnner> {
  canDeactivate(component: GameRunnner): boolean {
   
    if(component.gameRunning()){
        if (confirm("You have a game in progress, if you leave progress will be lost.")) {
            return true;
        } else {
            return false;
        }
    }
    return true;
  }
}