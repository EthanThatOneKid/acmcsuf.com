import { fetchNewsletters } from './_query';
import type { EndpointOutput } from '@sveltejs/kit';
import type { Newsletter } from './_query';

const website = 'https://acmcsuf.com';

const renderXML = (post: Newsletter): string => {
  return `<item>
  <title>${post.title}</title>
  <description>${post.labels.join(', ')}</description>
  <link>${website}/newsletters/${post.id}/</link>
  <pubDate>${new Date(post.lastEdited)}</pubDate>
  <content:encoded>
    <div style="margin-top: 50px; font-style: italic;">
      <strong>
        <a href="${website}/blog/${post.id}">
          Keep reading
        </a>
      </strong>  
    </div>
  </content:encoded>
</item>`;
};

export async function get(): Promise<EndpointOutput> {
  const posts = await fetchNewsletters();
  const description =
    'README by acmCSUF is a weekly newsletter that covers all of the latest news and events from the acmCSUF community. It is also a place for you to share your thoughts and experiences with the acmCSUF community.';
  return {
    headers: {
      'Cache-Control': 'max-age=0, s-maxage=3600',
      'Content-Type': 'application/xml',
    },
    body: `<rss xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:content="https://purl.org/rss/1.0/modules/content/" xmlns:atom="https://www.w3.org/2005/Atom" version="2.0">
    <channel>
      <title>ACM at CSUF Newsletters</title>
      <link>${website}</link>
      <description>${description}</description>
      ${posts.map(renderXML).join('')}
    </channel>
  </rss>`,
  };
}
