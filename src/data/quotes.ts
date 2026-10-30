import { abuNawas } from './quotes/abu-nawas';
import { alFarabi } from './quotes/al-farabi';
import { alGhazali } from './quotes/al-ghazali';
import { alKindi } from './quotes/al-kindi';
import { albertEinstein } from './quotes/albert-einstein';
import { allMight } from './quotes/all-might';
import { aristoteles } from './quotes/aristoteles';
import { billGates } from './quotes/bill-gates';
import { bjHabibie } from './quotes/bj-habibie';
import { colinPowell } from './quotes/colin-powell';
import { georgeBernardShaw } from './quotes/george-bernard-shaw';
import { henryFord } from './quotes/henry-ford';
import { ibnuKhaldun } from './quotes/ibnu-khaldun';
import { ibnuSina } from './quotes/ibnu-sina';
import { jackMa } from './quotes/jack-ma';
import { jalaluddinRumi } from './quotes/jalaludin-rumi';
import { mahatmaGandhi } from './quotes/mahatma-gandhi';
import { monkeyDLuffy } from './quotes/monkey-d-luffy';
import { napoleonHill } from './quotes/napoleon-hill';
import { narutoUzumaki } from './quotes/naruto-uzumaki';
import { pythagoras } from './quotes/phytagoras';
import { plato } from './quotes/plato';
import { socrates } from './quotes/socrates';
import { soekarno } from './quotes/soekarno';
import { steveJobs } from './quotes/steve-jobs';
import { sunTzu } from './quotes/sun-tzu';
import { tanMalaka } from './quotes/tan-malaka';
import { tereLiye } from './quotes/tere-liye';
import { terjemahan } from './quotes/terjemahan';
import { terverifikasi } from './quotes/terverifikasi';
import { thales } from './quotes/thales';
import { ustadzAdiHidayat } from './quotes/ustadz-adi-hidayat';
import { waltDisney } from './quotes/walt-disney';

export interface Quote {
  id: number;
  text: string;
  author: string;
  category: string;
  source?: string;
  original?: string;
  citation?: string;
}

interface QuoteWithoutId {
  text: string;
  author: string;
  category: string;
  source?: string;
  original?: string;
  citation?: string;
}

const rawQuotes: QuoteWithoutId[] = [
  ...albertEinstein,
  ...alFarabi,
  ...soekarno,
  ...tereLiye,
  ...ibnuSina,
  ...narutoUzumaki,
  ...georgeBernardShaw,
  ...bjHabibie,
  ...monkeyDLuffy,
  ...alKindi,
  ...allMight,
  ...steveJobs,
  ...ibnuKhaldun,
  ...billGates,
  ...mahatmaGandhi,
  ...alGhazali,
  ...colinPowell,
  ...jalaluddinRumi,
  ...henryFord,
  ...waltDisney,
  ...napoleonHill,
  ...abuNawas,
  ...ustadzAdiHidayat,
  ...jackMa,
  ...sunTzu,
  ...tanMalaka,
  ...aristoteles,
  ...plato,
  ...thales,
  ...pythagoras,
  ...socrates,
  // Keep last: appending here leaves existing quote IDs unchanged
  ...terverifikasi,
  ...terjemahan,
];

// Auto-generate IDs
export const quotes: Quote[] = rawQuotes.map((quote, index) => ({
  ...quote,
  id: index + 1,
}));
