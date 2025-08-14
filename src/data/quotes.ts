import { albertEinstein } from './quotes/albert-einstein';
import { allMight } from './quotes/all-might';
import { billGates } from './quotes/bill-gates';
import { bjHabibie } from './quotes/bj-habibie';
import { colinPowell } from './quotes/colin-powell';
import { georgeBernardShaw } from './quotes/george-bernard-shaw';
import { henryFord } from './quotes/henry-ford';
import { mahatmaGandhi } from './quotes/mahatma-gandhi';
import { monkeyDLuffy } from './quotes/monkey-d-luffy';
import { napoleonHill } from './quotes/napoleon-hill';
import { narutoUzumaki } from './quotes/naruto-uzumaki';
import { soekarno } from './quotes/soekarno';
import { steveJobs } from './quotes/steve-jobs';
import { tereLiye } from './quotes/tere-liye';
import { waltDisney } from './quotes/walt-disney';

export interface Quote {
  id: number;
  text: string;
  author: string;
  category: string;
}

interface QuoteWithoutId {
  text: string;
  author: string;
  category: string;
}

const rawQuotes: QuoteWithoutId[] = [
  ...albertEinstein,
  ...soekarno,
  ...tereLiye,
  ...narutoUzumaki,
  ...georgeBernardShaw,
  ...bjHabibie,
  ...monkeyDLuffy,
  ...allMight,
  ...steveJobs,
  ...billGates,
  ...mahatmaGandhi,
  ...colinPowell,
  ...henryFord,
  ...waltDisney,
  ...napoleonHill,
];

// Auto-generate IDs
export const quotes: Quote[] = rawQuotes.map((quote, index) => ({
  ...quote,
  id: index + 1,
}));
