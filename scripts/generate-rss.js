import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';

// NOTE: Ensure these matches your .env or replace with hardcoded values for the script
const projectId = process.env.VITE_SANITY_PROJECT_ID || 'your-project-id';
const dataset = 'production';
const apiToken = process.env.Sanity_API_Token; 
const canonicalUrl = 'https://zorlex.agency'; // Replace with your live domain

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-05-03',
  token: apiToken,
  useCdn: false,
});

async function generateRss() {
  const query = `*[_type == "post"] | order(publishedAt desc)[0...25] {
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    "url": "${canonicalUrl}/blog/" + slug.current
  }`;

  try {
    const posts = await client.fetch(query);
    
    const items = posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${post.url}</link>
      <guid isPermaLink="true">${post.url}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
    </item>`).join('');

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Zorlex Agency | Blog</title>
  <link>${canonicalUrl}/blog</link>
  <description>Latest insights on digital engineering and cinematic engineering.</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${canonicalUrl}/rss.xml" rel="self" type="application/rss+xml" />
  ${items}
</channel>
</rss>`;

    const outputPath = path.join(process.cwd(), 'public', 'rss.xml');
    fs.writeFileSync(outputPath, rss);
    console.log('✅ RSS Feed successfully generated at public/rss.xml');
    
  } catch (error) {
    console.error('❌ Error generating RSS feed:', error);
  }
}

generateRss();
