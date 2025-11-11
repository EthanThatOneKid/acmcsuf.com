export interface Branding {
  title: string;
  description: string;
  teamLogo: TeamLogo;
  teamColor: TeamColor;
}

export interface TeamLogo {
  image: string;
  alt: string;
  title: string;
  svg: string;
  png: string;
}

export interface TeamColor {
  name: string;
  hex: string;
  rgb: string;
}
