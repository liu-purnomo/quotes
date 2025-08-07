'use client';

/**
 * Home Page Component
 * 
 * This is the main page of the Indonesian Quotes application.
 * It displays a random quote with category filtering functionality
 * and provides information about the available API endpoints.
 */

// Import necessary dependencies
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
// Import data and components
import { quotes } from '@/data/quotes';
import QuoteCard from '@/components/QuoteCard';
import CategoryFilter from '@/components/CategoryFilter';

/**
 * Home Component
 * Main page of the application that displays quotes and API information
 * 
 * @returns {JSX.Element} - Rendered component
 */
export default function Home() {
  // State for tracking the selected category filter
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // State for tracking the current quote index in the filtered list
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(0);

  /**
   * Extract unique categories from quotes data
   * Uses Set to ensure uniqueness and memoizes the result for performance
   */
  const categories = useMemo(() => {
    const uniqueCategories = new Set(quotes.map(quote => quote.category));
    return Array.from(uniqueCategories);
  }, []);

  /**
   * Filter quotes based on selected category
   * Returns all quotes if no category is selected
   */
  const filteredQuotes = useMemo(() => {
    if (!selectedCategory) return quotes;
    return quotes.filter(quote => quote.category === selectedCategory);
  }, [selectedCategory]);

  /**
   * Get a random quote from the filtered quotes list
   * Updates the currentQuoteIndex state with a random index
   */
  const getRandomQuote = () => {
    if (filteredQuotes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    setCurrentQuoteIndex(randomIndex);
  };

  /**
   * Initialize with a random quote when component mounts
   * or when the selected category changes
   */
  useEffect(() => {
    getRandomQuote();
  }, [selectedCategory]);

  return (
    // Main container with responsive padding and dark mode support
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header section with title and API information */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Kutipan Inspiratif</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Temukan inspirasi dan motivasi dari kutipan-kutipan dalam Bahasa Indonesia</p>
          
          {/* API Documentation link */}
          <div className="flex justify-center mb-4">
            <Link 
              href="/api/docs" 
              className="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
              aria-label="View API Documentation"
            >
              Dokumentasi API
            </Link>
          </div>
          
          {/* API Endpoints information box */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6 text-left">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Endpoint API:</h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li><code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">/api/quotes</code> - Semua kutipan</li>
              <li><code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">/api/quotes/random</code> - Kutipan acak</li>
              <li><code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">/api/quotes/{'{id}'}</code> - Kutipan berdasarkan ID</li>
              <li><code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">/api/categories</code> - Daftar kategori</li>
            </ul>
          </div>
        </div>

        {/* Category filter component */}
        <CategoryFilter 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />

        {/* Quote display section - shows either a quote card or a message if no quotes match the filter */}
        {filteredQuotes.length > 0 ? (
          <QuoteCard 
            quote={filteredQuotes[currentQuoteIndex]} 
            onNewQuote={getRandomQuote} 
          />
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-600 dark:text-gray-400">Tidak ada kutipan dalam kategori ini.</p>
          </div>
        )}

        {/* Footer with copyright information */}
        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Kutipan Bahasa Indonesia | Dibuat oleh <a href="https://liupurnomo.com" className="underline hover:text-gray-400">Liu Purnomo</a></p>
          <p className="mt-1"><a href="mailto:hi@liupurnomo.com" className="underline hover:text-gray-400">hi@liupurnomo.com</a></p>
        </footer>
      </div>
    </div>
  );
}
