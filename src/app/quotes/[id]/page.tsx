'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Copy, Download, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Quote {
  id: number;
  text: string;
  author: string;
  category: string;
}

interface NavigationQuote {
  id: number;
  author: string;
}

export default function QuoteDetailPage() {
  const params = useParams();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [prevQuote, setPrevQuote] = useState<NavigationQuote | null>(null);
  const [nextQuote, setNextQuote] = useState<NavigationQuote | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(`/api/quotes/${params.id}`);
        const data = await response.json();

        if (data.status === 'SUCCESS') {
          setQuote(data.data);
          
          // Fetch navigation quotes
          const navResponse = await fetch(`/api/quotes/navigation/${params.id}`);
          const navData = await navResponse.json();
          
          if (navData.status === 'SUCCESS') {
            setPrevQuote(navData.data.prev);
            setNextQuote(navData.data.next);
          }
        } else {
          setError(data.message);
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
      setTimeout(() => setCopied(false), 2000);
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

  const downloadAsImage = () => {
    // This would implement download as image functionality
    // For now, we'll just copy to clipboard
    copyToClipboard();
  };

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-950 to-blue-900"></div>

        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-24">
            <div className="backdrop-blur-3xl bg-gradient-to-br from-white/20 via-white/10 to-transparent border border-white/30 rounded-[2rem] p-16 max-w-lg mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
              <div className="relative z-10">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-white/30 border-t-cyan-400 mb-6"></div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Memuat Kutipan...
                </h3>
                <p className="text-white/70">Mohon tunggu sebentar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>

        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-24">
            <div className="backdrop-blur-3xl bg-gradient-to-br from-red-500/20 via-red-500/10 to-transparent border border-red-400/30 rounded-[2rem] p-16 max-w-lg mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-red-500/5 to-transparent"></div>
              <div className="relative z-10">
                <div className="text-8xl mb-6">⚠️</div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Kutipan Tidak Ditemukan
                </h3>
                <p className="text-white/70 mb-8 text-lg leading-relaxed">
                  {error}
                </p>
                <Link
                  href="/quotes"
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 backdrop-blur-xl border border-cyan-400/40 text-white hover:from-cyan-500/40 hover:via-blue-500/40 hover:to-purple-500/40 transition-all duration-300 font-medium shadow-lg"
                >
                  Kembali ke Daftar Kutipan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/quotes"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xl border border-white/30 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Kembali</span>
          </Link>
        </div>

        {/* Main Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
          className="backdrop-blur-3xl bg-gradient-to-br from-white/20 via-white/10 to-transparent border border-white/30 rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent rounded-2xl sm:rounded-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-1 sm:h-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-t-2xl sm:rounded-t-3xl"></div>

          <div className="relative z-10 text-center">
            {/* Quote Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6 sm:mb-8 lg:mb-12"
            >
              <blockquote className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl leading-relaxed text-white/95 font-medium tracking-wide">
                &quot;{quote.text}&quot;
              </blockquote>
            </motion.div>

            {/* Author Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-6 sm:mb-8 lg:mb-12"
            >
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-cyan-200 mb-1 sm:mb-2">
                {quote.author}
              </p>
              <p className="text-white/60 capitalize text-sm sm:text-base lg:text-lg">
                {quote.category}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center"
            >
              <button
                onClick={copyToClipboard}
                className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 text-white hover:bg-white/20 transition-all duration-200 font-medium text-sm sm:text-base"
              >
                <Copy className="h-4 w-4 sm:h-5 sm:w-5" />
                {copied ? 'Disalin!' : 'Salin'}
              </button>

              <button
                onClick={shareQuote}
                className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500/30 to-blue-500/30 backdrop-blur-xl border border-cyan-400/40 text-white hover:from-cyan-500/40 hover:to-blue-500/40 transition-all duration-200 font-medium text-sm sm:text-base"
              >
                <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                Bagikan
              </button>

              <button
                onClick={downloadAsImage}
                className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-xl border border-purple-400/40 text-white hover:from-purple-500/40 hover:to-pink-500/40 transition-all duration-200 font-medium text-sm sm:text-base"
              >
                <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                Download
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Navigation */}
        {(prevQuote || nextQuote) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8"
          >
            <div className="backdrop-blur-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent rounded-xl sm:rounded-2xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-white/80 text-sm sm:text-base font-medium mb-3 sm:mb-4 text-center">
                  Kutipan Lainnya
                </h3>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {/* Previous Quote */}
                  <div className="flex-1">
                    {prevQuote ? (
                      <Link
                        href={`/quotes/${prevQuote.id}`}
                        className="group flex items-center gap-3 p-3 sm:p-4 rounded-lg bg-white/5 backdrop-blur-xl border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                      >
                        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm text-white/60 mb-1">Sebelumnya</p>
                          <p className="font-medium truncate text-sm sm:text-base">{prevQuote.author}</p>
                        </div>
                      </Link>
                    ) : (
                      <div className="flex items-center gap-3 p-3 sm:p-4 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 text-white/40">
                        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                        <div className="flex-1">
                          <p className="text-xs sm:text-sm mb-1">Sebelumnya</p>
                          <p className="font-medium text-sm sm:text-base">Tidak ada</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Next Quote */}
                  <div className="flex-1">
                    {nextQuote ? (
                      <Link
                        href={`/quotes/${nextQuote.id}`}
                        className="group flex items-center gap-3 p-3 sm:p-4 rounded-lg bg-white/5 backdrop-blur-xl border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex-1 min-w-0 text-right">
                          <p className="text-xs sm:text-sm text-white/60 mb-1">Selanjutnya</p>
                          <p className="font-medium truncate text-sm sm:text-base">{nextQuote.author}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                      </Link>
                    ) : (
                      <div className="flex items-center gap-3 p-3 sm:p-4 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 text-white/40">
                        <div className="flex-1 text-right">
                          <p className="text-xs sm:text-sm mb-1">Selanjutnya</p>
                          <p className="font-medium text-sm sm:text-base">Tidak ada</p>
                        </div>
                        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quote ID Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="text-center mt-6"
        >
          <p className="text-white/50 text-sm">Kutipan #{quote.id}</p>
        </motion.div>
      </div>
    </div>
  );
}
