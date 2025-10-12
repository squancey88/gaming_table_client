export interface AICCommonFields {
  id: string;
  created_at: string;
  updated_at: string;
  created: Date;
  updated: Date;
}

export interface GamingGroup extends AICCommonFields {
  name: string;
  members: Array<User>
  owners: Array<User>;
}

export interface User extends AICCommonFields {
  email: string;
  display_name: string;
}

export interface GamingSession extends AICCommonFields {
  start_time: Date
}

export interface Game extends AICCommonFields {

}

export interface GameSystem extends AICCommonFields {
  competitive: boolean;
  edition: string;
  name: string;
  slug: string;
  type: string;
}

export const TOKEN_STORAGE_KEY = 'aic_token';
export const SELECTED_GROUP_KEY = 'aic_selected_group';
