import type { ListItem } from '$lib/components/recursive-ul/types';
import type { TIERS } from '$lib/public/board/data';

export interface ClubPosition<ToolNames extends string = string> {
  title: keyof typeof TIERS;
  teamColor: string;
  requirements: ListItem[];
  tools: ToolNames[];
  responsibilities: ListItem[];
}
