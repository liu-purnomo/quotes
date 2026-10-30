'use client';

import { ArrowLeft, ArrowRight, Check, Copy, ExternalLink, ImageIcon, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AuthorAvatar from '@/components/AuthorAvatar';
import QuoteImageEditor from '@/components/QuoteImageEditor';
import type { AuthorPhoto } from '@/data/authorPhotos';

interface Quote {
  id: number;
  text: string;
  author: string;
  category: string;
  source?: string;
  original?: string;
  citation?: string;
  photo?: AuthorPhoto;
}

interface NavigationQuote {
  id: number;
  author: string;
}

const MORE_QUOTES = 4;
const COPIED_MS = 2000;

const secondaryButton =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/10';

// Short quotes can carry display type; long ones need to stay readable
function quoteTextSize(text: string): string {
  if (text.length < 90) return 'text-3xl sm:text-5xl';
  if (text.length < 200) return 'text-2xl sm:text-4xl';
  return 'text-xl sm:text-3xl';
}

export default function QuoteDetailPage() {
  const params = useParams();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [prevQuote, setPrevQuote] = useState<NavigationQuote | null>(null);
  const [nextQuote, setNextQuote] = useState<NavigationQuote | null>(null);
  const [moreQuotes, setMoreQuotes] = useState<Quote[]>([]);
  const [editorOpen, setEditorOpen] = useState(false);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(`/api/quotes/${params.id}`);
        const data = await response.json();

        if (data.status !== 'SUCCESS') {
          setError(data.message);
          return;
        }

        setQuote(data.data);

        const authorParams = new URLSearchParams({
          author: data.data.author,
          authorExact: 'true',
          limit: (MORE_QUOTES + 1).toString(),
        });
        const [navData, authorData] = await Promise.all([
          fetch(`/api/quotes/navigation/${params.id}`).then((res) => res.json()),
          fetch(`/api/quotes?${authorParams}`).then((res) => res.json()),
        ]);

        if (navData.status === 'SUCCESS') {
          setPrevQuote(navData.data.prev);
          setNextQuote(navData.data.next);
        }
        if (authorData.status === 'SUCCESS') {
          setMoreQuotes(
            authorData.data
              .filter((other: Quote) => other.id !== data.data.id)
              .slice(0, MORE_QUOTES)
          );
        }
      } catch {
        setError('Gagal memuat kutipan');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchQuote();
    }
  }, [params.id]);

  const copyToClipboard = async () => {
    if (!quote) return;

    const text = `"${quote.text}" - ${quote.author}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), COPIED_MS);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const shareQuote = async () => {
    if (!quote) return;

    const text = `"${quote.text}" - ${quote.author}`;
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Kutipan Inspiratif',
          text: text,
          url: url,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyToClipboard();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white">
        <div className="mx-auto max-w-3xl animate-pulse px-4 pt-24 sm:px-6">
          <div className="space-y-4">
            <div className="h-9 w-full rounded bg-white/10" />
            <div className="h-9 w-5/6 rounded bg-white/10" />
            <div className="h-9 w-2/3 rounded bg-white/10" />
          </div>
          <div className="mt-10 flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-white/10" />
            <div className="h-4 w-40 rounded bg-white/10" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 text-center text-white">
        <div>
          <h1 className="font-serif text-3xl">Kutipan tidak ditemukan</h1>
          <p className="mt-3 text-white/60">{error}</p>
          <Link href="/quotes" className={`${secondaryButton} mt-6`}>
            Kembali ke koleksi
          </Link>
        </div>
      </div>
    );
  }

  const authorHref = `/quotes?author=${encodeURIComponent(quote.author)}`;

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-3xl px-4 pb-16 pt-6 sm:px-6">
        <nav className="flex items-center justify-between text-sm text-white/50">
          <Link href="/quotes" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Koleksi
          </Link>
          <span>#{quote.id}</span>
        </nav>

        <main className="mt-12 sm:mt-20">
          <span aria-hidden="true" className="block h-12 font-serif text-7xl leading-none text-amber-200/70 sm:h-16 sm:text-8xl">
            “
          </span>

          <blockquote className={`font-serif leading-[1.25] tracking-tight text-white ${quoteTextSize(quote.text)}`}>
            {quote.text}
          </blockquote>

          <div className="mt-10 flex items-center gap-4">
            <AuthorAvatar name={quote.author} photo={quote.photo} size={72} />
            <div className="min-w-0">
              <Link href={authorHref} className="block truncate text-lg font-medium hover:text-amber-200">
                {quote.author}
              </Link>
              <Link
                href={`/quotes?category=${encodeURIComponent(quote.category)}`}
                className="mt-1 inline-block rounded-full bg-white/[0.06] px-2.5 py-0.5 text-xs capitalize text-white/60 hover:text-white"
              >
                {quote.category}
              </Link>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 sm:flex-row">
            <button
              onClick={() => setEditorOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-200 px-5 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-amber-100"
            >
              <ImageIcon className="h-4 w-4" />
              Buat gambar
            </button>
            <button onClick={copyToClipboard} className={secondaryButton}>
              {copied ? <Check className="h-4 w-4 text-amber-200" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Disalin' : 'Salin'}
            </button>
            <button onClick={shareQuote} className={secondaryButton}>
              <Share2 className="h-4 w-4" />
              Bagikan
            </button>
          </div>

          {(quote.original || quote.citation || quote.source || quote.photo) && (
            <section className="mt-10 space-y-3 border-t border-white/10 pt-6 text-sm text-white/50">
              {quote.original && (
                <details className="group">
                  <summary className="cursor-pointer text-white/70 hover:text-white">
                    Terjemahan oleh Quotes. Lihat teks asli
                  </summary>
                  <p className="mt-2 font-serif text-base italic text-white/70">{quote.original}</p>
                </details>
              )}
              {quote.citation && <p>{quote.citation}</p>}
              {quote.source && (
                <a
                  href={quote.source}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-white/70 hover:text-white"
                >
                  Sumber kutipan
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
              {quote.photo && (
                <p className="text-xs text-white/40">
                  Foto: {quote.photo.artist} ·{' '}
                  <a href={quote.photo.page} target="_blank" rel="noreferrer" className="underline hover:text-white/70">
                    {quote.photo.license}, Wikimedia Commons
                  </a>
                </p>
              )}
            </section>
          )}
        </main>

        {moreQuotes.length > 0 && (
          <section className="mt-14">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-serif text-xl">Kutipan lain dari {quote.author}</h2>
              <Link href={authorHref} className="shrink-0 text-sm text-white/50 hover:text-white">
                Lihat semua
              </Link>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {moreQuotes.map((other) => (
                <Link
                  key={other.id}
                  href={`/quotes/${other.id}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 font-serif leading-relaxed text-white/80 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <span className="line-clamp-4">{other.text}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {(prevQuote || nextQuote) && (
          <nav aria-label="Kutipan lainnya" className="mt-14 grid grid-cols-2 gap-3 border-t border-white/10 pt-6 text-sm">
            {prevQuote ? (
              <Link href={`/quotes/${prevQuote.id}`} className="group min-w-0">
                <span className="inline-flex items-center gap-1 text-white/40">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Sebelumnya
                </span>
                <span className="mt-1 block truncate text-white/80 group-hover:text-amber-200">{prevQuote.author}</span>
              </Link>
            ) : (
              <span />
            )}
            {nextQuote && (
              <Link href={`/quotes/${nextQuote.id}`} className="group min-w-0 text-right">
                <span className="inline-flex items-center gap-1 text-white/40">
                  Selanjutnya
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <span className="mt-1 block truncate text-white/80 group-hover:text-amber-200">{nextQuote.author}</span>
              </Link>
            )}
          </nav>
        )}
      </div>

      {editorOpen && (
        <QuoteImageEditor quote={quote} onClose={() => setEditorOpen(false)} />
      )}
    </div>
  );
}
