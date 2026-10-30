'use client';

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { ArrowLeft, Check, ChevronDown, Copy, Search, Share2, X } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AuthorAvatar from '@/components/AuthorAvatar';
import type { AuthorPhoto } from '@/data/authorPhotos';

interface Quote {
  id: number;
  text: string;
  author: string;
  category: string;
  photo?: AuthorPhoto;
  original?: string;
}

interface Author {
  name: string;
  count: number;
  photo?: AuthorPhoto;
}

interface ApiResponse {
  status: string;
  message: string;
  data: Quote[];
  metadata?: {
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
    };
  };
}

const QUOTES_PER_PAGE = 18;
const FEATURED_AUTHORS = 16;
const SEARCH_DELAY_MS = 300;
const COPIED_MS = 1800;
const AUTHOR_RESULTS = 40;

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

function QuoteSkeleton() {
  return (
    <div className="mb-4 break-inside-avoid animate-pulse rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="space-y-2.5">
        <div className="h-3.5 w-full rounded bg-white/10" />
        <div className="h-3.5 w-11/12 rounded bg-white/10" />
        <div className="h-3.5 w-3/5 rounded bg-white/10" />
      </div>
      <div className="mt-5 flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-white/10" />
        <div className="h-3 w-28 rounded bg-white/10" />
      </div>
    </div>
  );
}

interface AuthorPickerProps {
  authors: Author[];
  value: string;
  onChange: (value: string) => void;
}

function AuthorPicker({ authors, value, onChange }: AuthorPickerProps) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const matches = needle
      ? authors.filter((author) => author.name.toLowerCase().includes(needle))
      : authors;
    return matches.slice(0, AUTHOR_RESULTS);
  }, [authors, query]);

  return (
    <Combobox
      value={value}
      onChange={(next) => onChange(next ?? '')}
      onClose={() => setQuery('')}
    >
      <div className="relative w-full sm:w-64">
        <ComboboxInput
          aria-label="Pilih tokoh"
          placeholder="Semua tokoh"
          displayValue={(name: string) => name}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-3.5 pr-9 text-sm text-white placeholder:text-white/40 focus:border-amber-300/60 focus:outline-none"
        />
        <ComboboxButton aria-label="Buka daftar tokoh" className="absolute inset-y-0 right-0 flex items-center px-2.5 text-white/50">
          <ChevronDown className="h-4 w-4" />
        </ComboboxButton>
        <ComboboxOptions
          anchor="bottom start"
          className="z-50 mt-1 max-h-72 w-[var(--input-width)] overflow-y-auto rounded-xl border border-white/10 bg-neutral-900 p-1 shadow-2xl empty:invisible"
        >
          {results.map((author) => (
            <ComboboxOption
              key={author.name}
              value={author.name}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-white/80 data-[focus]:bg-white/10 data-[focus]:text-white"
            >
              <AuthorAvatar name={author.name} photo={author.photo} size={26} />
              <span className="truncate">{author.name}</span>
              <span className="ml-auto text-xs text-white/40">{author.count}</span>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
}

export default function QuotesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const requestRef = useRef(0);

  const fetchQuotes = useCallback(async () => {
    const request = ++requestRef.current;
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: QUOTES_PER_PAGE.toString(),
      });

      if (searchTerm) params.append('search', searchTerm);
      if (selectedAuthor) {
        params.append('author', selectedAuthor);
        params.append('authorExact', 'true');
      }
      if (selectedCategory) params.append('category', selectedCategory);

      const response = await fetch(`/api/quotes?${params}`);
      const data: ApiResponse = await response.json();
      if (request !== requestRef.current) return;

      if (data.status === 'SUCCESS') {
        // "Load more" keeps what is already on screen
        setQuotes((current) => (currentPage === 1 ? data.data : [...current, ...data.data]));
        if (data.metadata?.pagination) {
          setTotalPages(data.metadata.pagination.totalPages);
          setTotalItems(data.metadata.pagination.totalItems);
        }
      } else {
        setError(data.message);
      }
    } catch {
      if (request === requestRef.current) setError('Gagal memuat kutipan');
    } finally {
      if (request === requestRef.current) setLoading(false);
    }
  }, [currentPage, searchTerm, selectedAuthor, selectedCategory]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Links from a quote's detail page arrive with a filter already chosen
      const linked = new URLSearchParams(window.location.search);
      setSelectedAuthor(linked.get('author') ?? '');
      setSelectedCategory(linked.get('category') ?? '');

      fetch('/api/quotes/authors?detail=true')
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'SUCCESS') setAuthors(data.data);
        })
        .catch((err) => console.error('Failed to fetch authors:', err));

      fetch('/api/quotes/categories?sort=popular')
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'SUCCESS') setCategories(data.data);
        })
        .catch((err) => console.error('Failed to fetch categories:', err));
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(fetchQuotes, SEARCH_DELAY_MS);
    return () => clearTimeout(timeoutId);
  }, [fetchQuotes]);

  const featuredAuthors = useMemo(
    () =>
      authors
        .filter((author) => author.photo)
        .sort((a, b) => b.count - a.count)
        .slice(0, FEATURED_AUTHORS),
    [authors]
  );

  const hasFilters = Boolean(searchTerm || selectedAuthor || selectedCategory);

  const updateFilter = (apply: () => void) => {
    apply();
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedAuthor('');
    setSelectedCategory('');
    setCurrentPage(1);
  };

  const copyToClipboard = async (quote: Quote) => {
    try {
      await navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
      setCopiedId(quote.id);
      setTimeout(() => setCopiedId(null), COPIED_MS);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const shareQuote = async (quote: Quote) => {
    if (!navigator.share) {
      copyToClipboard(quote);
      return;
    }

    try {
      await navigator.share({
        title: 'Kutipan Inspiratif',
        text: `"${quote.text}" - ${quote.author}`,
        url: `${window.location.origin}/quotes/${quote.id}`,
      });
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const isFirstLoad = loading && currentPage === 1;

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Beranda
        </Link>

        <header className="mt-8 max-w-2xl">
          <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Koleksi Kutipan</h1>
          <p className="mt-3 text-white/60">
            {totalItems ? `${totalItems.toLocaleString('id-ID')} kutipan` : 'Kutipan'} dari{' '}
            {authors.length || 'banyak'} tokoh, dari filsuf kuno sampai tokoh Indonesia hari ini.
          </p>
        </header>

        {featuredAuthors.length > 0 && (
          <section aria-label="Tokoh populer" className="-mx-4 mt-8 sm:-mx-6">
            <div className="flex gap-4 overflow-x-auto px-4 pb-2 sm:px-6">
              {featuredAuthors.map((author) => {
                const active = selectedAuthor === author.name;
                return (
                  <button
                    key={author.name}
                    onClick={() => updateFilter(() => setSelectedAuthor(active ? '' : author.name))}
                    aria-pressed={active}
                    className="group flex w-[4.5rem] shrink-0 flex-col items-center gap-2"
                  >
                    <AuthorAvatar
                      name={author.name}
                      photo={author.photo}
                      size={60}
                      className={`ring-2 ring-offset-2 ring-offset-neutral-950 transition-all ${
                        active ? 'ring-amber-300' : 'ring-transparent grayscale group-hover:grayscale-0'
                      }`}
                    />
                    <span className={`line-clamp-2 text-center text-xs leading-tight ${active ? 'text-amber-200' : 'text-white/60'}`}>
                      {author.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        <div className="sticky top-0 z-30 -mx-4 mt-6 border-b border-white/10 bg-neutral-950/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="search"
                aria-label="Cari kutipan"
                placeholder="Cari kutipan atau tokoh..."
                value={searchTerm}
                onChange={(event) => updateFilter(() => setSearchTerm(event.target.value))}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-white/40 focus:border-amber-300/60 focus:outline-none"
              />
            </div>
            <AuthorPicker
              authors={authors}
              value={selectedAuthor}
              onChange={(value) => updateFilter(() => setSelectedAuthor(value))}
            />
          </div>

          <div className="-mx-4 mt-2.5 flex gap-1.5 overflow-x-auto px-4 sm:-mx-6 sm:px-6">
            {['', ...categories].map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category || 'semua'}
                  onClick={() => updateFilter(() => setSelectedCategory(category))}
                  aria-pressed={active}
                  className={`shrink-0 rounded-full px-3 py-1 text-xs transition-colors ${
                    active ? 'bg-amber-200 font-medium text-neutral-900' : 'bg-white/[0.06] text-white/60 hover:text-white'
                  }`}
                >
                  {category ? capitalize(category) : 'Semua'}
                </button>
              );
            })}
          </div>
        </div>

        {hasFilters && !isFirstLoad && (
          <div className="mt-4 flex items-center justify-between text-sm text-white/50">
            <span>{totalItems.toLocaleString('id-ID')} hasil</span>
            <button onClick={resetFilters} className="inline-flex items-center gap-1 hover:text-white">
              <X className="h-3.5 w-3.5" />
              Hapus filter
            </button>
          </div>
        )}

        {error ? (
          <div className="py-20 text-center">
            <p className="text-white/70">{error}</p>
            <button onClick={fetchQuotes} className="mt-4 rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/20">
              Coba lagi
            </button>
          </div>
        ) : isFirstLoad ? (
          <div className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {Array.from({ length: 9 }, (_, i) => (
              <QuoteSkeleton key={i} />
            ))}
          </div>
        ) : quotes.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-white/70">Tidak ada kutipan yang cocok.</p>
            <button onClick={resetFilters} className="mt-4 rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/20">
              Hapus filter
            </button>
          </div>
        ) : (
          <>
            <div className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3">
              {quotes.map((quote) => (
                <article
                  key={quote.id}
                  className="group relative mb-4 break-inside-avoid rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <Link href={`/quotes/${quote.id}`} className="block">
                    <blockquote className="font-serif text-[1.05rem] leading-relaxed text-white/90">
                      {quote.text}
                    </blockquote>
                  </Link>

                  <footer className="mt-4 flex items-center gap-2.5">
                    <AuthorAvatar name={quote.author} photo={quote.photo} size={36} />
                    <div className="min-w-0 flex-1">
                      <button
                        onClick={() => updateFilter(() => setSelectedAuthor(quote.author))}
                        className="block max-w-full truncate text-left text-sm font-medium text-white/90 hover:text-amber-200"
                      >
                        {quote.author}
                      </button>
                      <p className="truncate text-xs capitalize text-white/40">
                        {quote.category}
                        {quote.original && ' · terjemahan'}
                      </p>
                    </div>

                    <div className="flex opacity-100 transition-opacity sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
                      <button
                        onClick={() => copyToClipboard(quote)}
                        aria-label="Salin kutipan"
                        className="rounded-lg p-2 text-white/50 hover:bg-white/10 hover:text-white"
                      >
                        {copiedId === quote.id ? <Check className="h-4 w-4 text-amber-200" /> : <Copy className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => shareQuote(quote)}
                        aria-label="Bagikan kutipan"
                        className="rounded-lg p-2 text-white/50 hover:bg-white/10 hover:text-white"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </footer>
                </article>
              ))}
            </div>

            {currentPage < totalPages && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setCurrentPage((page) => page + 1)}
                  disabled={loading}
                  className="rounded-xl border border-white/15 px-6 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/10 disabled:opacity-50"
                >
                  {loading ? 'Memuat...' : 'Muat lebih banyak'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
