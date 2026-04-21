import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';

const projectId = process.env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET || 'production';
const apiToken = process.env.SANITY_API_TOKEN; 
const canonicalUrl = 'https://zorlex.agency';

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-05-03',
  token: apiToken,
  useCdn: false,
});

async function generateRss() {
  console.log(`📡 Starting RSS generation for Project: ${projectId}`);
  
  if (!projectId || projectId === 'your-project-id') {
    console.warn('⚠️ RSS generation skipped: Project ID is missing.');
    return;
  }

  const query = `*[_type == "post"] | order(publishedAt desc)[0...25] {
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    "url": "${canonicalUrl}/blog/" + slug.current
  }`;

  try {
    const posts = await client.fetch(query);
    console.log(`✅ Fetched ${posts?.length || 0} posts from Sanity.`);

    const items = (posts || []).map(post => {
      return `
    <item>
      <title><![CDATA[${post.title || ''}]]></title>
      <link>${post.url || ''}</link>
      <guid isPermaLink="true">${post.url || ''}</guid>
      <pubDate>${post.publishedAt ? new Date(post.publishedAt).toUTCString() : new Date().toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt || ''}]]></description>
    </item>`;
    }).join('');

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

    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    const outputPath = path.join(publicDir, 'rss.xml');
    fs.writeFileSync(outputPath, rss);
    console.log('✅ RSS Feed successfully generated!');
    
  } catch (error) {
    console.error('❌ Error during RSS generation:', error.message);
    // We don't process.exit(1) here to allow the main build to succeed even if RSS fails
  }
}

generateRss().catch(err => {
  console.error('💥 Fatal error in RSS script:', err);
});
