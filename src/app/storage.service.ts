import { Injectable } from '@angular/core';
import { GameCache } from './data-interfaces';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  readonly game_cache_key = "game_cache";

  constructor() { }

  generateUUID(): string {
    return uuidv4(); 
  }

  gamesByType(type: string): Array<GameCache> {
    const cache = this.loadGameCache();
    return cache.filter((item) => item.type == type);
  }

  loadGame(id: string): GameCache|null {
    const index = this.findGameIndexById(id);
    console.log(index);
    if(index > -1) {
      return this.loadGameCache()[index];
    } else {
      return null;
    }
  }

  deleteGame(id: string) {
    const cache = this.loadGameCache();
    const index = this.findGameIndexById(id);
    if(index > -1) {
      cache.splice(index, 1)
    }
    this.saveGames(cache);
  }

  saveGame(gameObject: GameCache): string {
    const gameCache = this.loadGameCache();
    gameObject.saved = new Date();
    if(gameObject.id == null) {
      gameObject.id = this.generateUUID();
      gameCache.push(gameObject);
    } else {
      const matchIndex = this.findGameIndexById(gameObject.id)
      if(matchIndex > -1) {
        gameCache[matchIndex] = gameObject;
      } else {
        gameCache.push(gameObject);
      }
    }
    this.saveGames(gameCache);
    return gameObject.id;
  }

  private findGameIndexById(id: string): number {
    return this.loadGameCache().findIndex((item) => item.id == id)
  }

  private saveGames(gameCache: Array<GameCache>) {
    localStorage.setItem(this.game_cache_key, JSON.stringify(gameCache));
  }

  private loadGameCache(): Array<GameCache> {
    const data = localStorage.getItem(this.game_cache_key);
    if(data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  }
}
