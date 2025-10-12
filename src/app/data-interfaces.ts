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
  aic_id?: string;
  data_version: string;
  players: Array<MTGPlayer>;
  health_changes: Array<HealthChange>;
  start_health: number;
  turn_tracking: Array<TimeEvent>;
}

export interface TimeEvent {
  current_player_index?: number;
  start_time: Date;
  end_time?: Date;
}

export interface MTGPlayer {
  name: string;
  aic_id: string;
  table_seat: number;
}

export interface HealthChange {
  target_player_index: number | "others";
  change: number;
  source_player_index: number;
  commander: boolean;
  at: Date;
}

export interface Login {
  email: string;
  password: string;
}
