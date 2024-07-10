import type { ListItem } from '$lib/components/recursive-ul/types';
import type { TIERS_JSON } from '$lib/public/board/data';

export interface ClubPosition<ToolNames extends string = string> {
  title: keyof typeof TIERS_JSON;
  teamColor: string;
  qualifications: ListItem[];
  requirements?: ListItem[];
  tools: ToolNames[];
  responsibilities: ListItem[];
}
