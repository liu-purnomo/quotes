'use client';

// Import necessary dependencies
import { useState } from 'react';
// Import Quote interface from data module
import { Quote } from '@/data/quotes';

/**
 * Props interface for the QuoteCard component
 * @property {Quote} quote - The quote object to display
 * @property {Function} onNewQuote - Callback function to fetch a new quote
 */
interface QuoteCardProps {
  quote: Quote;
  onNewQuote: () => void;
}

/**
 * QuoteCard Component
 * Displays a single quote with author and category information
 * Includes a button to request a new random quote
 * 
 * @param {QuoteCardProps} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
export default function QuoteCard({ quote, onNewQuote }: QuoteCardProps) {
  return (
    // Main card container with responsive styling and hover effects
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full mx-auto transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col space-y-4">
        {/* Quote text section */}
        <div className="mb-4">
          <p className="text-lg text-gray-800 dark:text-gray-200 mb-4">{quote.text}</p>
        </div>
        {/* Author and category section with top border */}
        <div className="border-t pt-4 dark:border-gray-700">
          <p className="text-right text-gray-600 dark:text-gray-400 font-semibold">— {quote.author}</p>
          <p className="text-right text-sm text-gray-500 dark:text-gray-500 mt-1 italic">#{quote.category}</p>
        </div>
        {/* Button to fetch a new quote */}
        <button
          onClick={onNewQuote}
          className="mt-4 bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          aria-label="Get a new quote"
        >
          Kutipan Baru
        </button>
      </div>
    </div>
  );
}