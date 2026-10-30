// Builds a translation queue of sourced quotes from English Wikiquote.
// Usage: node scripts/wikiquote/extract.mjs
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const QUEUE = join(HERE, 'queue.jsonl');
const API = 'https://en.wikiquote.org/w/api.php';
const USER_AGENT = 'quotes-research/1.0 (https://github.com/liu-purnomo/quotes)';
const MAX_PER_AUTHOR = 40;

const AUTHORS = readFileSync(join(HERE, 'authors.txt'), 'utf8')
  .split('\n').map((line) => line.trim()).filter(Boolean);

const SKIP_SECTION = /misattribut|disputed|attributed|about |quotes about|quotations about|unsourced|unverified|external|see also|references|notes|works|bibliography|sources|fictional|dialogue|lyrics|poems about|adaptation/i;
const DROP_TEXT = /\[\[|\{\{|\}\}|https?:|<|\||=|\b(he|she|his|her|him)\b.*\b(said|wrote)\b/i;

function clean(raw) {
  return raw
    .replace(/<ref[^>]*\/>/g, ' ').replace(/<ref[^>]*>[\s\S]*?<\/ref>/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ').replace(/<br\s*\/?>/gi, ' ')
    .replace(/\{\{w\|([^}|]*)(\|[^}]*)?\}\}/g, '$1')
    .replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, '$1')
    .replace(/'''?/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ').trim();
}

function quotesFrom(title, wikitext) {
  const results = [];
  const lines = wikitext.split('\n');
  let skipping = false;

  for (let i = 0; i < lines.length; i++) {
    const heading = lines[i].match(/^(==+)\s*(.+?)\s*==+\s*$/);
    if (heading) {
      // A skipped top-level section covers its subsections too
      if (heading[1].length === 2) skipping = SKIP_SECTION.test(heading[2]);
      else if (SKIP_SECTION.test(heading[2])) skipping = true;
      continue;
    }
    if (skipping || !/^\*(?![*:])\s*\S/.test(lines[i])) continue;

    const citation = [];
    for (let j = i + 1; j < lines.length && /^\*[*:]/.test(lines[j]); j++) citation.push(clean(lines[j].replace(/^[*:]+\s*/, '')));

    const text = clean(lines[i].replace(/^\*\s*/, '')).replace(/^["“]|["”]$/g, '');
    if (!citation.length || !citation.join(' ').trim()) continue;
    if (text.length < 40 || text.length > 240 || DROP_TEXT.test(text)) continue;
    if (!/^[A-Z"]/.test(text) || /[,;:]$/.test(text)) continue;
    // English-only pages can still hold other languages
    if (/[^\x00-\x7F’‘“”—–…éèáíóúüöäñçàêîôû]/.test(text)) continue;

    results.push({ author: title, text, citation: citation.join(' ').slice(0, 240) });
  }
  return results;
}

const done = new Set(existsSync(QUEUE) ? readFileSync(QUEUE, 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l).text) : []);
const queue = [];
const perAuthor = {};

for (let i = 0; i < AUTHORS.length; i += 50) {
  const params = new URLSearchParams({
    action: 'query', format: 'json', prop: 'revisions', rvprop: 'content', rvslots: 'main',
    redirects: '1', titles: AUTHORS.slice(i, i + 50).join('|'), maxlag: '5',
  });
  const response = await fetch(`${API}?${params}`, { headers: { 'User-Agent': USER_AGENT } });
  const data = await response.json();

  for (const page of Object.values(data.query.pages)) {
    const content = page.revisions?.[0]?.slots?.main?.['*'];
    if (!content) { console.log('missing', page.title); continue; }
    const quotes = quotesFrom(page.title, content).slice(0, MAX_PER_AUTHOR);
    perAuthor[page.title] = quotes.length;
    for (const quote of quotes) if (!done.has(quote.text)) queue.push(quote);
  }
  await new Promise((resolve) => setTimeout(resolve, 300));
}

writeFileSync(QUEUE, `${queue.map((q) => JSON.stringify(q)).join('\n')}\n`, { flag: 'a' });
console.log('added', queue.length, 'authors', Object.keys(perAuthor).length);
console.log(Object.entries(perAuthor).sort((a, b) => a[1] - b[1]).slice(0, 15).map(([a, n]) => `${a}:${n}`).join(' | '));
