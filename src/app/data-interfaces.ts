export interface DataCache {
  games: Array<GameCache>;
}

export interface GameCache {
  id: string;
  type: string;
  data: MTGGameInstance
  saved: Date;
}

export interface MTGGameInstance {
  started: Date;
  players: Array<MTGPlayer>;
  healthChanges: Array<HealthChange>;
  startHealth: number;
  timeTracking: Array<TimeEvent>;
}

export interface TimeEvent {
  currentPlayerIndex?: number;
  startTime: Date;
  endTime?: Date;
}

export interface MTGPlayer {
  name: string;
  aicId: string;
  tableSeat: number;
}

export interface HealthChange {
  targetPlayerIndex: number | "others";
  change: number;
  sourcePlayerIndex: number;
  commander: boolean;
  at: Date;
}

export interface Login {
  email: string;
  password: string;
}
