'use client';

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { motion } from 'framer-motion';
import { Check, ChevronDown, Copy, ExternalLink, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';

interface Quote {
  id: number;
  text: string;
  author: string;
  category: string;
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
      itemsPerPage: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

const QUOTES_PER_PAGE = 12;

function QuoteSkeleton() {
  return (
    <div className="backdrop-blur-3xl bg-gradient-to-r from-white/10 via-white/5 to-white/5 border border-white/20 rounded-2xl p-4 sm:p-6 relative overflow-hidden">
      <div className="animate-pulse">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1 space-y-3">
            <div className="space-y-2">
              <div className="h-4 bg-white/20 rounded-lg w-full"></div>
              <div className="h-4 bg-white/20 rounded-lg w-5/6"></div>
              <div className="h-4 bg-white/20 rounded-lg w-4/6"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-3 bg-white/20 rounded-lg w-24"></div>
              <div className="h-2 w-2 bg-white/20 rounded-full"></div>
              <div className="h-3 bg-white/20 rounded-lg w-16"></div>
            </div>
          </div>
          <div className="flex items-center gap-2 lg:flex-shrink-0">
            <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
            <div className="w-16 h-8 bg-white/20 rounded-lg"></div>
            <div className="w-16 h-8 bg-white/20 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  className?: string;
}

function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  className = '',
}: CustomSelectProps) {
  const selectedOption = options.find((option) => option.value === value) || {
    value: '',
    label: placeholder,
  };

  return (
    <div className={`relative ${className}`}>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <ListboxButton className="relative w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 cursor-pointer text-left">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"></div>
            <span className="block truncate relative text-sm sm:text-base">
              {selectedOption.label}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-3 sm:right-4 flex items-center">
              <ChevronDown
                className="h-4 w-4 sm:h-5 sm:w-5 text-white/70 transition-transform duration-200 ui-open:rotate-180"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95 translate-y-[-10px]"
            enterTo="transform opacity-100 scale-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100 translate-y-0"
            leaveTo="transform opacity-0 scale-95 translate-y-[-10px]"
          >
            <ListboxOptions className="absolute z-[999999] mt-1 w-full rounded-xl bg-slate-900/95 backdrop-blur-3xl border border-white/20 shadow-2xl max-h-40 sm:max-h-60 overflow-auto focus:outline-none">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none"></div>
              {options.map((option) => (
                <ListboxOption
                  key={option.value}
                  className={({ active, selected }) =>
                    `relative cursor-pointer select-none py-2.5 sm:py-3 px-4 sm:px-6 transition-all duration-200 ${
                      active ? 'bg-cyan-500/20 text-cyan-100' : 'text-white/80'
                    } ${selected ? 'bg-cyan-500/30 text-cyan-100' : ''} ${
                      option.value === options[0].value ? 'rounded-t-2xl' : ''
                    } ${
                      option.value === options[options.length - 1].value
                        ? 'rounded-b-2xl'
                        : ''
                    }`
                  }
                  value={option.value}
                >
                  {({ selected }) => (
                    <motion.div
                      initial={false}
                      animate={{ x: selected ? 4 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-between"
                    >
                      <span
                        className={`block truncate text-sm sm:text-base ${
                          selected ? 'font-semibold' : 'font-normal'
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.2, delay: 0.1 }}
                          className="text-cyan-400 flex-shrink-0"
                        >
                          <Check
                            className="h-3 w-3 sm:h-4 sm:w-4"
                            aria-hidden="true"
                          />
                        </motion.span>
                      )}
                    </motion.div>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default function QuotesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchQuotes = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: QUOTES_PER_PAGE.toString(),
      });

      if (searchTerm) params.append('search', searchTerm);
      if (selectedAuthor) params.append('author', selectedAuthor);
      if (selectedCategory) params.append('category', selectedCategory);

      const response = await fetch(`/api/quotes?${params}`);
      const data: ApiResponse = await response.json();

      if (data.status === 'SUCCESS') {
        setQuotes(data.data);
        if (data.metadata?.pagination) {
          setTotalPages(data.metadata.pagination.totalPages);
          setTotalItems(data.metadata.pagination.totalItems);
        }
      } else {
        setError(data.message);
      }
    } catch {
      setError('Gagal memuat kutipan');
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, selectedAuthor, selectedCategory]);

  const fetchAuthors = async () => {
    try {
      const response = await fetch('/api/quotes/authors');
      const data: { status: string; data: string[] } = await response.json();
      if (data.status === 'SUCCESS') {
        setAuthors(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch authors:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/quotes/categories');
      const data: { status: string; data: string[] } = await response.json();
      if (data.status === 'SUCCESS') {
        setCategories(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  useEffect(() => {
    fetchAuthors();
    fetchCategories();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchQuotes();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedAuthor, selectedCategory, currentPage, fetchQuotes]);

  const authorOptions: SelectOption[] = useMemo(
    () => [
      { value: '', label: 'Semua Penulis' },
      ...authors.map((author) => ({ value: author, label: author })),
    ],
    [authors]
  );

  const categoryOptions: SelectOption[] = useMemo(
    () => [
      { value: '', label: 'Semua Kategori' },
      ...categories.map((category) => ({
        value: category,
        label: category.charAt(0).toUpperCase() + category.slice(1),
      })),
    ],
    [categories]
  );

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedAuthor('');
    setSelectedCategory('');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = async (quote: Quote) => {
    const text = `"${quote.text}" - ${quote.author}`;
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const shareQuote = async (quote: Quote) => {
    const text = `"${quote.text}" - ${quote.author}`;
    const url = `${window.location.origin}/quotes/${quote.id}`;

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
      copyToClipboard(quote);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900"></div>

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight drop-shadow-2xl">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Koleksi Kutipan Inspiratif
            </span>
          </h1>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
            Temukan inspirasi dari kata-kata bijak para tokoh terkenal dunia
          </p>
        </div>

        <div className="bg-gradient-to-br from-white/20 via-white/10 to-transparent border border-white/30 rounded-2xl p-3 sm:p-4 lg:p-6 mb-6 sm:mb-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] relative">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent rounded-2xl"></div>
          <div className="relative">
            {/* Mobile-Optimized Search and Filters */}
            <div className="space-y-3 sm:space-y-4">
              {/* Search Input */}
              <div>
                <input
                  type="text"
                  placeholder="Cari kutipan atau penulis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 text-sm sm:text-base"
                />
              </div>

              {/* Filters Row */}
              <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                <div className="flex-1 min-w-0">
                  <CustomSelect
                    value={selectedAuthor}
                    onChange={setSelectedAuthor}
                    options={authorOptions}
                    placeholder="Penulis"
                    className="w-full"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <CustomSelect
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    options={categoryOptions}
                    placeholder="Kategori"
                    className="w-full"
                  />
                </div>

                <button
                  onClick={resetFilters}
                  className="xs:w-auto w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-red-500/30 to-pink-500/30 backdrop-blur-xl border border-red-400/40 text-white hover:from-red-500/40 hover:to-pink-500/40 focus:outline-none focus:ring-2 focus:ring-red-400/50 transition-all duration-300 font-medium text-sm whitespace-nowrap"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm mt-4 text-white/70">
              <span className="font-medium">
                Menampilkan {quotes.length} dari {totalItems} kutipan
              </span>
              {(searchTerm || selectedAuthor || selectedCategory) && (
                <div className="flex flex-wrap gap-3">
                  {searchTerm && (
                    <span className="px-4 py-2 rounded-full bg-cyan-500/30 backdrop-blur-sm border border-cyan-400/40 text-cyan-100 font-medium">
                      &quot;{searchTerm}&quot;
                    </span>
                  )}
                  {selectedAuthor && (
                    <span className="px-4 py-2 rounded-full bg-emerald-500/30 backdrop-blur-sm border border-emerald-400/40 text-emerald-100 font-medium">
                      {selectedAuthor}
                    </span>
                  )}
                  {selectedCategory && (
                    <span className="px-4 py-2 rounded-full bg-purple-500/30 backdrop-blur-sm border border-purple-400/40 text-purple-100 capitalize font-medium">
                      {selectedCategory}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {error ? (
          <div className="text-center py-24">
            <div className="backdrop-blur-3xl bg-gradient-to-br from-red-500/20 via-red-500/10 to-transparent border border-red-400/30 rounded-[2rem] p-16 max-w-lg mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-red-500/5 to-transparent"></div>
              <div className="relative z-10">
                <div className="text-8xl mb-6">⚠️</div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Terjadi Kesalahan
                </h3>
                <p className="text-white/70 mb-8 text-lg leading-relaxed">
                  {error}
                </p>
                <button
                  onClick={() => fetchQuotes()}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-500/30 via-pink-500/30 to-red-500/30 backdrop-blur-xl border border-red-400/40 text-white hover:from-red-500/40 hover:via-pink-500/40 hover:to-red-500/40 transition-all duration-300 font-medium shadow-lg"
                >
                  Coba Lagi
                </button>
              </div>
            </div>
          </div>
        ) : loading ? (
          <div className="space-y-4 mb-16">
            {Array.from({ length: 8 }, (_, i) => (
              <QuoteSkeleton key={i} />
            ))}
          </div>
        ) : quotes.length === 0 ? (
          <div className="text-center py-24">
            <div className="backdrop-blur-3xl bg-gradient-to-br from-white/20 via-white/10 to-transparent border border-white/30 rounded-[2rem] p-16 max-w-lg mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
              <div className="relative z-10">
                <div className="text-8xl mb-6 animate-bounce">=</div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Tidak ada kutipan ditemukan
                </h3>
                <p className="text-white/70 mb-8 text-lg leading-relaxed">
                  Coba ubah kata kunci pencarian atau filter Anda
                </p>
                <button
                  onClick={resetFilters}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 backdrop-blur-xl border border-cyan-400/40 text-white hover:from-cyan-500/40 hover:via-blue-500/40 hover:to-purple-500/40 transition-all duration-300 font-medium shadow-lg"
                >
                  Reset Filter
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-16">
              {quotes.map((quote) => (
                <div
                  key={quote.id}
                  className="group backdrop-blur-3xl bg-gradient-to-r from-white/15 via-white/10 to-white/5 border border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.4)] transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative flex flex-col gap-3 sm:gap-4">
                    {/* Quote Content */}
                    <div className="flex-1">
                      <blockquote className="text-sm sm:text-base lg:text-lg leading-relaxed text-white/95 font-medium mb-2 sm:mb-3">
                        &quot;{quote.text}&quot;
                      </blockquote>
                      <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 sm:gap-4">
                        <p className="font-semibold text-cyan-200 group-hover:text-cyan-100 transition-colors duration-300 text-sm sm:text-base">
                          {quote.author}
                        </p>
                        <span className="hidden xs:block text-white/40 text-sm">
                          •
                        </span>
                        <p className="text-white/60 capitalize text-xs sm:text-sm font-medium">
                          {quote.category}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 border-t border-white/10 sm:border-t-0 sm:pt-0">
                      <Link
                        href={`/quotes/${quote.id}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all duration-200 text-sm font-medium"
                      >
                        <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="sm:hidden">Detail</span>
                        <span className="hidden sm:inline">Lihat Detail</span>
                      </Link>

                      <div className="flex gap-2">
                        <button
                          onClick={() => copyToClipboard(quote)}
                          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200 text-xs sm:text-sm"
                        >
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </button>

                        <button
                          onClick={() => shareQuote(quote)}
                          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200 text-xs sm:text-sm"
                        >
                          <Share2 className="h-3 w-3" />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="backdrop-blur-3xl bg-gradient-to-br from-white/20 via-white/10 to-transparent border border-white/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
                <div className="relative">
                  {/* Mobile Layout */}
                  <div className="sm:hidden flex flex-col gap-3">
                    <div className="text-center text-white/80 text-sm font-medium">
                      Halaman {currentPage} dari {totalPages}
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 backdrop-blur-xl border border-white/30 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/20 transition-all duration-300 font-medium text-sm"
                      >
                        ← Prev
                      </button>

                      <div className="flex gap-1">
                        {Array.from(
                          { length: Math.min(3, totalPages) },
                          (_, i) => {
                            let pageNum;
                            if (totalPages <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage <= 2) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 1) {
                              pageNum = totalPages - 2 + i;
                            } else {
                              pageNum = currentPage - 1 + i;
                            }

                            return (
                              <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`w-8 h-8 rounded-lg transition-all duration-300 font-medium text-sm ${
                                  currentPage === pageNum
                                    ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white border-0 shadow-lg shadow-blue-500/25'
                                    : 'bg-white/10 backdrop-blur-xl border border-white/30 text-white hover:bg-white/20'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          }
                        )}
                      </div>

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 backdrop-blur-xl border border-white/30 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/20 transition-all duration-300 font-medium text-sm"
                      >
                        Next →
                      </button>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden sm:flex flex-col items-center gap-4 lg:gap-6">
                    <div className="text-white/80 text-base lg:text-lg font-medium">
                      Halaman {currentPage} dari {totalPages}
                    </div>

                    <div className="flex items-center gap-3 flex-wrap justify-center">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/30 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/20 transition-all duration-300 font-medium"
                      >
                        ← Prev
                      </button>

                      <div className="flex gap-2 mx-4">
                        {Array.from(
                          { length: Math.min(5, totalPages) },
                          (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }

                            return (
                              <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`w-12 h-12 rounded-xl transition-all duration-300 font-medium ${
                                  currentPage === pageNum
                                    ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white border-0 shadow-lg shadow-blue-500/25'
                                    : 'bg-white/10 backdrop-blur-xl border border-white/30 text-white hover:bg-white/20'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          }
                        )}
                      </div>

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/30 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/20 transition-all duration-300 font-medium"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
