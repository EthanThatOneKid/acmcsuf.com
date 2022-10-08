export interface ParsedLink {
  relativePathname: string;
  query: string;
  hash: string;
}

export interface Link<ID extends string> extends ParsedLink {
  id: ID;
  destination: string;
}
