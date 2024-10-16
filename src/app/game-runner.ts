import { HostListener } from "@angular/core";
import { Directive } from "@angular/core";

@Directive()
export abstract class GameRunnner {

  abstract gameRunning(): boolean;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.gameRunning()) {
      $event.returnValue = true;
    }
  }
}