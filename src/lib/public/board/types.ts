export enum Term {
  Spring21 = 'S21',
  Fall21 = 'F21',
  Spring22 = 'S22',
  Fall22 = 'F22',
  Spring23 = 'S23',
}

// TODO: Warn if the tier does not appear in the officer data.
export enum Tier {
  PRESIDENT,
  VICE_PRESIDENT,
  WEBMASTER,
  SECRETARY,
  TREASURER,
  DATA_ANALYST,
  SPECIAL_EVENTS_LEADER,
  SPECIAL_EVENTS_OFFICER,
  MARKETING_LEADER,
  HISTORIAN,
  EVENT_COORDINATOR,
  ALGO_LEADER,
  ALGO_OFFICER,
  DESIGN_LEADER,
  DESIGN_OFFICER,
  DESIGN_PROJECT_MANAGER,
  DESIGN_OPERATIONS_MANAGER,
  DEV_LEADER,
  DEV_PROJECT_MANAGER,
  DEV_OFFICER,
  AI_LEADER,
  AI_OFFICER,
  NODEBUDS_OFFICER,
}

export enum Social {
  Website = 'website',
  GitHub = 'github',
  Discord = 'discord',
  LinkedIn = 'linkedin',
  Instagram = 'instagram',
}

export interface Officer {
  fullName: string;
  picture: string;
  socials?: {
    [s in Social]?: string;
  };
  positions: {
    [t in Term]?: {
      title: string;
      tier: Tier;
    };
  };
}
