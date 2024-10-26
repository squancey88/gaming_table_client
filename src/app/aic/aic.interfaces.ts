export interface AICCommonFields {
  id: string;
  created_at: string;
  updated_at: string;
  created: Date;
  updated: Date;
}

export interface GamingGroup extends AICCommonFields {
  name: string;
}