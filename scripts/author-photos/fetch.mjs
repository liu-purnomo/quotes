// Looks up freely licensed author portraits through Wikidata and Wikimedia Commons.
// Usage: node scripts/author-photos/fetch.mjs
// Writes candidates.json for review; build.mjs turns approved rows into app data.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(HERE, '../../src/data/quotes');
const USER_AGENT = 'quotes-app/1.0 (https://github.com/liu-purnomo/quotes)';
const FREE_LICENSE = /^(public domain|pd\b|pdm|cc0|cc[ -]by(-sa)?[ -]\d|no restrictions|copyrighted free use|godl)/i;
const TITLE_ALIASES = {
  Seneca: 'Seneca the Younger',
  'Dalai Lama': '14th Dalai Lama',
  'Ustadz Adi Hidayat': 'Adi Hidayat',
  'Ustadz Abdul Somad': 'Abdul Somad',
  'KH Zainuddin MZ': 'Zainuddin M.Z.',
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getJson(url) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT }, signal: AbortSignal.timeout(30000) });
    if (response.ok) return response.json();
    await sleep(2000 * (attempt + 1));
  }
  throw new Error(`Failed: ${url}`);
}

const chunks = (items, size) => Array.from({ length: Math.ceil(items.length / size) }, (_, i) => items.slice(i * size, (i + 1) * size));

const authors = new Set();
for (const file of readdirSync(DATA_DIR)) {
  for (const match of readFileSync(join(DATA_DIR, file), 'utf8').matchAll(/author:\s*(['"])((?:\\.|(?!\1).)*)\1/g)) {
    authors.add(match[2].replace(/\\'/g, "'"));
  }
}

// Author name -> Wikidata item, trying Indonesian Wikipedia first
const items = new Map();
for (const host of ['id.wikipedia.org', 'en.wikipedia.org']) {
  const pending = [...authors].filter((author) => !items.has(author));
  for (const batch of chunks(pending, 50)) {
    const params = new URLSearchParams({
      action: 'query', format: 'json', redirects: '1', prop: 'pageprops',
      ppprop: 'wikibase_item|disambiguation', titles: batch.map((author) => TITLE_ALIASES[author] ?? author).join('|'),
    });
    const data = await getJson(`https://${host}/w/api.php?${params}`);
    const redirects = new Map();
    for (const { from, to } of [...(data.query.normalized ?? []), ...(data.query.redirects ?? [])]) redirects.set(from, to);
    const resolve = (name) => { let current = name; while (redirects.has(current)) current = redirects.get(current); return current; };

    const pages = new Map(Object.values(data.query.pages).map((page) => [page.title, page]));
    for (const author of batch) {
      const page = pages.get(resolve(TITLE_ALIASES[author] ?? author));
      if (page?.pageprops?.wikibase_item && !('disambiguation' in page.pageprops)) {
        items.set(author, { qid: page.pageprops.wikibase_item, title: page.title, host });
      }
    }
    await sleep(200);
  }
}
console.log('authors', authors.size, 'matched', items.size);

// Only real people with a curated portrait (P18) are kept
const entities = new Map();
for (const batch of chunks([...new Set([...items.values()].map((item) => item.qid))], 50)) {
  const params = new URLSearchParams({ action: 'wbgetentities', format: 'json', props: 'claims|descriptions', languages: 'id|en', ids: batch.join('|') });
  const data = await getJson(`https://www.wikidata.org/w/api.php?${params}`);
  for (const [id, entity] of Object.entries(data.entities)) entities.set(id, entity);
  await sleep(200);
}

const rows = [];
for (const [author, item] of items) {
  const claims = entities.get(item.qid)?.claims ?? {};
  const isHuman = (claims.P31 ?? []).some((claim) => claim.mainsnak?.datavalue?.value?.id === 'Q5');
  const image = claims.P18?.[0]?.mainsnak?.datavalue?.value;
  if (!isHuman || !image) continue;
  const descriptions = entities.get(item.qid).descriptions ?? {};
  rows.push({ author, ...item, file: image, description: descriptions.id?.value ?? descriptions.en?.value ?? '' });
}
console.log('with portrait', rows.length);

const licenses = {};
const results = [];
for (const batch of chunks(rows, 40)) {
  const params = new URLSearchParams({
    action: 'query', format: 'json', prop: 'imageinfo', iiprop: 'url|extmetadata', iiurlwidth: '250',
    iiextmetadatafilter: 'LicenseShortName|Artist|Credit', titles: batch.map((row) => `File:${row.file}`).join('|'),
  });
  const data = await getJson(`https://commons.wikimedia.org/w/api.php?${params}`);
  const normalized = new Map((data.query.normalized ?? []).map(({ from, to }) => [from, to]));
  const pages = new Map(Object.values(data.query.pages).map((page) => [page.title, page]));

  for (const row of batch) {
    const info = pages.get(normalized.get(`File:${row.file}`) ?? `File:${row.file}`)?.imageinfo?.[0];
    if (!info) continue;
    const license = info.extmetadata?.LicenseShortName?.value ?? '';
    licenses[license] = (licenses[license] ?? 0) + 1;
    if (!FREE_LICENSE.test(license)) continue;
    const artist = (info.extmetadata?.Artist?.value ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    results.push({ ...row, url: info.thumburl, page: info.descriptionshorturl ?? info.descriptionurl, license, artist });
  }
  await sleep(300);
}

writeFileSync(join(HERE, 'candidates.json'), `${JSON.stringify(results.sort((a, b) => a.author.localeCompare(b.author)), null, 1)}\n`);
console.log('free', results.length);
console.log(Object.entries(licenses).sort((a, b) => b[1] - a[1]).slice(0, 14).map(([k, v]) => `${k}:${v}`).join(' | '));
const missing = [...authors].filter((author) => !results.some((row) => row.author === author));
console.log('no photo', missing.length, missing.slice(0, 60).join(', '));
