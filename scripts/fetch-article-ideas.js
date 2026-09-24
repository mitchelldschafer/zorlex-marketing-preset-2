import fs from 'fs';
import path from 'path';

// Fetches the RSS/Atom feeds listed in scripts/feeds.json, filters items to the
// last few days, scores them against the configured keywords, and writes a
// markdown digest of article ideas to content-ideas/digest-YYYY-MM-DD.md.
//
// Usage: node scripts/fetch-article-ideas.js
// No dependencies beyond Node 18+ (native fetch).

const configPath = path.join(process.cwd(), 'scripts', 'feeds.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const { settings, keywords, sources } = config;

const FETCH_TIMEOUT_MS = 15000;

// --- Minimal RSS 2.0 / Atom parsing -----------------------------------------
// Feeds are simple enough that tag extraction covers every source we use;
// this avoids adding an XML parser dependency to the site build.

const decodeEntities = (str) =>
  str
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, '&')
    .replace(/<[^>]+>/g, '')
    .trim();

const getTag = (xml, tag) => {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
  return match ? decodeEntities(match[1]) : '';
};

const getAtomLink = (xml) => {
  // Prefer rel="alternate", fall back to the first <link href="...">
  const alternate = xml.match(/<link[^>]*rel="alternate"[^>]*href="([^"]+)"/i);
  if (alternate) return decodeEntities(alternate[1]);
  const any = xml.match(/<link[^>]*href="([^"]+)"/i);
  return any ? decodeEntities(any[1]) : '';
};

function parseFeed(xml) {
  const isAtom = /<feed[\s>]/i.test(xml) && !/<rss[\s>]/i.test(xml);
  const itemTag = isAtom ? 'entry' : 'item';
  const blocks = xml.match(new RegExp(`<${itemTag}[\\s>][\\s\\S]*?</${itemTag}>`, 'gi')) || [];

  return blocks.map((block) => {
    const title = getTag(block, 'title');
    const link = isAtom ? getAtomLink(block) : getTag(block, 'link') || getAtomLink(block);
    const dateRaw =
      getTag(block, 'pubDate') ||
      getTag(block, 'published') ||
      getTag(block, 'updated') ||
      getTag(block, 'dc:date');
    const description = getTag(block, 'description') || getTag(block, 'summary') || getTag(block, 'content');
    const date = dateRaw ? new Date(dateRaw) : null;
    return {
      title,
      link,
      date: date && !isNaN(date) ? date : null,
      description: description.slice(0, 300),
    };
  });
}

// --- Scoring -----------------------------------------------------------------

function scoreItem(item, category) {
  const haystack = `${item.title} ${item.description}`.toLowerCase();
  const matched = [];
  let score = 0;

  for (const kw of keywords.categories[category] || []) {
    if (haystack.includes(kw.toLowerCase())) {
      score += 2;
      matched.push(kw);
    }
  }
  for (const kw of keywords.boost || []) {
    if (haystack.includes(kw.toLowerCase())) {
      score += 1;
      matched.push(kw);
    }
  }
  // Fresher items rank higher: +3 today, +2 yesterday, +1 day before.
  if (item.date) {
    const ageDays = (Date.now() - item.date.getTime()) / 86400000;
    score += Math.max(0, 3 - Math.floor(ageDays));
  }
  return { score, matched: [...new Set(matched)] };
}

// --- Fetching ----------------------------------------------------------------

async function fetchSource(source) {
  try {
    const res = await fetch(source.url, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; ZorlexDigest/1.0; +https://zorlex.agency)' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const cutoff = Date.now() - settings.maxAgeDays * 86400000;

    const items = parseFeed(xml)
      .filter((item) => item.title && item.link)
      .filter((item) => !item.date || item.date.getTime() >= cutoff)
      .slice(0, settings.maxItemsPerSource)
      .map((item) => {
        const { score, matched } = scoreItem(item, source.category);
        return { ...item, source: source.name, category: source.category, score, matched };
      });

    console.log(`  ✅ ${source.name}: ${items.length} recent items`);
    return items;
  } catch (error) {
    console.warn(`  ⚠️ ${source.name}: ${error.message}`);
    return [];
  }
}

// --- Digest output -----------------------------------------------------------

const CATEGORY_LABELS = {
  'ai-automation': '🤖 AI & Automation',
  'digital-marketing': '📈 Digital Marketing & SEO',
  'website-builds': '🛠️ Web Design & Website Builds',
};

const ANGLE_TEMPLATES = {
  'ai-automation': 'What this means for small businesses adopting AI — practical take, no hype.',
  'digital-marketing': 'React quickly: how does this change what Zorlex clients should do about SEO/content?',
  'website-builds': 'Tie to a Zorlex service page: how modern builds handle this (performance, UX, conversions).',
};

function buildDigest(itemsByCategory, dateStr) {
  const lines = [
    `# Article Idea Digest — ${dateStr}`,
    '',
    `> Auto-generated from ${sources.length} feeds (last ${settings.maxAgeDays} days). Items are scored by keyword relevance + recency.`,
    '',
  ];

  for (const [category, items] of Object.entries(itemsByCategory)) {
    lines.push(`## ${CATEGORY_LABELS[category] || category}`, '');
    if (items.length === 0) {
      lines.push('_No recent items matched._', '');
      continue;
    }
    lines.push(`_Angle to consider: ${ANGLE_TEMPLATES[category] || ''}_`, '');
    for (const item of items) {
      const date = item.date ? item.date.toISOString().slice(0, 10) : 'undated';
      lines.push(`### [${item.title}](${item.link})`);
      lines.push(`**${item.source}** · ${date} · score ${item.score}${item.matched.length ? ` · keywords: ${item.matched.join(', ')}` : ''}`);
      if (item.description) lines.push('', `> ${item.description}`);
      lines.push('');
    }
  }

  lines.push('---', '', '_Next step: pick 1-3 items, draft an original take (do not republish source content), and create the post in Sanity via the scripts in `scripts/`._', '');
  return lines.join('\n');
}

// --- Main ---------------------------------------------------------------------

async function main() {
  console.log(`📡 Fetching ${sources.length} feeds...`);
  const results = await Promise.all(sources.map(fetchSource));
  const allItems = results.flat();

  // Dedupe by normalized title (Google News often mirrors direct-feed stories).
  const seen = new Set();
  const deduped = allItems.filter((item) => {
    const key = item.title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const itemsByCategory = {};
  for (const category of Object.keys(keywords.categories)) {
    itemsByCategory[category] = deduped
      .filter((item) => item.category === category)
      .sort((a, b) => b.score - a.score)
      .slice(0, settings.maxItemsPerCategory);
  }

  const dateStr = new Date().toISOString().slice(0, 10);
  const outputDir = path.join(process.cwd(), settings.outputDir);
  fs.mkdirSync(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, `digest-${dateStr}.md`);
  fs.writeFileSync(outputPath, buildDigest(itemsByCategory, dateStr));

  const total = Object.values(itemsByCategory).reduce((n, items) => n + items.length, 0);
  console.log(`\n✅ Digest with ${total} ideas written to ${path.relative(process.cwd(), outputPath)}`);
}

main().catch((err) => {
  console.error('💥 Fatal error:', err);
  process.exit(1);
});
