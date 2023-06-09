/** Term is a string that is used to identify a CSUF semester. */
export enum Term {
  Spring21 = 'S21',
  Fall21 = 'F21',
  Spring22 = 'S22',
  Fall22 = 'F22',
  Spring23 = 'S23',
}

/**
 * Tier is used to determine the order of the board when displaying it in a
 * list.
 */
export interface Tier {
  /**
   * The number associated with the tier. As new tiers are added, this number
   * will increase.
   */
  id: number;

  /**
   * The index of the tier that is used to sort the tiers. This is used to
   * determine the order of the tiers. The lower the index, the higher the
   * tier. The higher the index, the lower the tier.
   */
  index: number;
}

/** Optional social media links for an officer. */
export enum Social {
  Website = 'website',
  GitHub = 'github',
  Discord = 'discord',
  LinkedIn = 'linkedin',
  Instagram = 'instagram',
}

interface Position {
  /**
   * The title of the position that the officer holds. This value is what is
   * displayed on the website.
   */
  title: string;

  /**
   * The tier that the position is associated with. This is used to determine
   * the order of the positions when displaying them in a list.
   *
   * @see Tier.id
   */
  tier: number;
}

export interface Officer {
  fullName: string;
  picture?: string;
  legacyPicture?: string;
  positions: {
    [key in Term]?: Position;
  };
  socials?: {
    [key in Social]?: string;
  };
}

/**
 * Team is used to represent a team of officers that are associated with a
 * specific team.
 */
export interface Team {
  title: string;
  id: string;
  picture: string;
  color: string;
}
