// Prints queue entries nobody has read yet, as `index|author|text`.
// Usage: node scripts/wikiquote/next.mjs [perAuthor] [limit]
// Mark a batch as read with: node scripts/wikiquote/next.mjs --mark-read <file>
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REVIEWED = join(HERE, 'reviewed.json');

const queue = readFileSync(join(HERE, 'queue.jsonl'), 'utf8').trim().split('\n').map((line) => JSON.parse(line));
const translated = JSON.parse(readFileSync(join(HERE, 'translations.json'), 'utf8')).map(({ i }) => i);
const reviewed = existsSync(REVIEWED) ? JSON.parse(readFileSync(REVIEWED, 'utf8')) : [];

if (process.argv[2] === '--mark-read') {
  const indices = readFileSync(process.argv[3], 'utf8').split('\n').map((line) => line.match(/^(\d+)\|/)?.[1]).filter(Boolean).map(Number);
  const merged = [...new Set([...reviewed, ...indices])].sort((a, b) => a - b);
  writeFileSync(REVIEWED, `${JSON.stringify(merged)}\n`);
  console.log('reviewed', merged.length);
  process.exit(0);
}

const seen = new Set([...translated, ...reviewed]);
const BAD_CITATION = /paraphras|attribut|apocryph|variant|disput|possibly|reported|fiction|character|spoken by|\bAct\b|\bScene\b|\bCanto\b|novel|sonnet|play\b|a play|comedy|tragedy|misquot|often quoted|commonly|popular|translation varies|as quoted|quoted in|cited in/i;
const BAD_TEXT = /\b(Mr|Mrs|Sir|Madam|Gentlemen|Negro|Negros|Jew|Jews|German|Germans|Russia|England|America|American|Soviet|Hitler|gravitational|quantum|ye|thee|thou|thy)\b|[éèàêîôûçäöüñ]/i;
const TOO_SPECIFIC = /\b(yesterday|today|tomorrow|this (book|letter|paper|morning|year|country)|last (week|year|night)|my (wife|husband|son|daughter|mother|father|dear))\b/i;
const ENGLISH_WORDS = /\b(the|is|of|and|to|a|in|that|you|not)\b/gi;

const pool = queue
  .map((row, i) => ({ ...row, i }))
  .filter(({ i, text, citation }) =>
    !seen.has(i) &&
    !BAD_CITATION.test(citation) &&
    !BAD_TEXT.test(text) &&
    !TOO_SPECIFIC.test(text) &&
    text.length <= 150 &&
    !/\s[A-Z][a-z]+/.test(text.slice(1)) &&
    (text.match(ENGLISH_WORDS) ?? []).length >= 2);

const perAuthor = Number(process.argv[2] ?? 5);
const limit = Number(process.argv[3] ?? 200);
const taken = {};
const lines = [];
for (const { i, author, text } of pool) {
  taken[author] = (taken[author] ?? 0) + 1;
  if (taken[author] <= perAuthor && lines.length < limit) lines.push(`${i}|${author}|${text}`);
}

console.log(`unread ${pool.length}, showing ${lines.length}`);
console.log(lines.join('\n'));
