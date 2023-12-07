import RSS from 'rss';
import type { BlogPost } from '$lib/public/blog/types';
import { discernLabels } from '$lib/public/blog/utils';
import { fetchBlogPosts } from '$lib/server/blog/posts';

export async function GET() {
  // TODO: Mix events and blog posts.
  const { posts } = await fetchBlogPosts();
  return new Response(makeRssFeed(posts), {
    status: 200,
    headers: { 'Cache-Control': 'max-age=0, s-maxage=3600', 'Content-Type': 'application/xml' },
  });
}

function makeRssFeed(posts: BlogPost[]): string {
  const feed = new RSS({
    title: 'acmCSUF README',
    description:
      'Posts written about computer science topics by the ACM community at California State Univerity Fullerton. It covers all the latest news and events for acmCSUF.',
    feed_url: 'https://acmcsuf.com/blog.xml',
    site_url: 'https://acmcsuf.com',
    image_url: 'https://acmcsuf.com/assets/general-logo.svg',
    categories: discernLabels(posts),
    pubDate: 'Jan 24, 2022 08:00:00 GMT',
    docs: 'https://acmcsuf.com/history-of-rss',
    copyright: '2022 acmCSUF',
    language: 'en',
    managingEditor: 'EthanThatOneKid',
    webMaster: 'EthanThatOneKid',
    ttl: 60,
  });

  for (const p of posts) {
    feed.item({
      title: p.title,
      description: truncateDescription(p.html, /* length=*/ 250),
      url: p.url,
      categories: p.labels,
      author: p.author.displayname,
      date: new Date(p.createdAt).toISOString(),
    });
  }

  return feed.xml({ indent: ' '.repeat(2) });
}

function truncateDescription(description: string, length: number) {
  const indexOfEndOfLastWord = description.lastIndexOf(' ', length);
  return description.slice(0, indexOfEndOfLastWord);
}
