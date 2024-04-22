export interface SiteMapEntry {
  id: string;
  title: string;
  link: string;
}

export interface SiteMap {
  [category: string]: SiteMapEntry[];
}
