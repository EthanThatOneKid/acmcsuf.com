export enum Term {
  Spring21 = 'S21',
  Fall21 = 'F21',
  Spring22 = 'S22',
  Fall22 = 'F22',
  Spring23 = 'S23',
}

export interface Officer {
  fullName: string;
  picture: string;
  displayName?: string;

  positions: {
    [t in Term]?: {
      title: string;
      tier: number;
    };
  };
}
