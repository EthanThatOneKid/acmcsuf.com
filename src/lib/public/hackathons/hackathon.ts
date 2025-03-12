/**
 * Hackathon represents a hackathon event.
 */
export interface Hackathon {
  id: string;
  title: string;
  date: string;
  location: string;
  theme: string;
  description: string;
  directors: Director[];
}

export interface Director {
  name: string;
  picture: string;
}
