export interface SiteMapEntry {
  id: string;
  title: string;
  link: string;
}

export type SiteMap = {
  [category: string]: SiteMapEntry[];
};