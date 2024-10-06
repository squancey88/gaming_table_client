
export interface TableConfig {
  seats: number;
  lights: {
    count: number;
    refresh_rate: number;
    sides: number[];
  }
}

export interface TableStatus {
  active: boolean;
  lights: {
    mode: string;
  }
}