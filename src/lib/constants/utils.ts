export function clean(link: string): string {
  const cleanedLink = link.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
  return cleanedLink;
} //this function is meant to clean links in $lib/constants/links'
