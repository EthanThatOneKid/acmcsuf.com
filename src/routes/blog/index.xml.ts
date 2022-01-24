import type { EndpointOutput } from '@sveltejs/kit';
import type { ResponseHeaders } from '@sveltejs/kit/types/helper';
import RSS from 'rss';
import type { Newsletter } from './_query';
import { fetchNewsletters } from './_query';

function getCategories(posts: Newsletter[]): string[] {
  const categories = new Set<string>();

  for (const newsletter of posts) {
    for (const label of newsletter.labels) {
      categories.add(label);
    }
  }

  return Array.from(categories);
}

function truncateDescription(description: string, length: number) {
  const indexOfEndOfLastWord = description.lastIndexOf(' ', length);
  return description.slice(0, indexOfEndOfLastWord);
}

function makeRssFeed(posts: Newsletter[]): string {
  const feed = new RSS({
    title: 'acmCSUF README',
    description:
      'Posts written about computer science topics by the ACM community at California State Univerity Fullerton. It covers all the latest news and events for acmCSUF.',
    feed_url: 'https://acmcsuf.com/blog.xml',
    site_url: 'https://acmcsuf.com',
    image_url: 'https://acmcsuf.com/assets/png/acm-csuf-badge.png',
    categories: getCategories(posts),
    pubDate: 'Jan 24, 2022 08:00:00 GMT',
    docs: 'https://acmcsuf.com/history-of-rss',
    copyright: '2022 acmCSUF',
    language: 'en',
    managingEditor: 'mikeploythai',
    webMaster: 'EthanThatOneKid',
    ttl: 60,
  });

  for (const newsletter of posts) {
    feed.item({
      title: newsletter.title,
      description: truncateDescription(newsletter.html, /* length=*/ 250),
      url: newsletter.url,
      categories: newsletter.labels,
      author: newsletter.author.displayname,
      date: new Date(newsletter.lastEdited).toISOString(),
    });
  }

  return feed.xml({ indent: ' '.repeat(2) });
}

export async function get(): Promise<EndpointOutput> {
  const headers: ResponseHeaders = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml',
  };

  const posts = await fetchNewsletters();
  const body = makeRssFeed(posts);

  return { headers, body };
}
