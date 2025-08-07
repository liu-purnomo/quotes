/**
 * API Endpoint for Random Quotes
 * 
 * This file implements the API endpoint for retrieving a random quote
 * Supports filtering by category and includes CORS headers for cross-origin access
 */

import { quotes } from '@/data/quotes';
import { NextResponse } from 'next/server';

/**
 * GET handler for /api/quotes/random endpoint
 * Retrieves a random quote, optionally filtered by category
 * 
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} JSON response with a random quote and CORS headers
 */
export async function GET(request: Request) {
  // Extract query parameters from the request URL
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  
  // Filter quotes by category if the category parameter is provided
  let filteredQuotes = quotes;
  if (category) {
    filteredQuotes = quotes.filter(quote => quote.category === category);
  }
  
  // Return 404 error if no quotes match the category filter
  if (filteredQuotes.length === 0) {
    return NextResponse.json(
      { error: 'No quotes found for this category' },
      { status: 404 }
    );
  }
  
  // Select a random quote from the filtered array
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];
  
  // Return the random quote as JSON with appropriate CORS headers
  return NextResponse.json(randomQuote, {
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow requests from any origin
      'Access-Control-Allow-Methods': 'GET, OPTIONS', // Allow GET and OPTIONS methods
      'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
    },
  });
}

/**
 * OPTIONS handler for /api/quotes/random endpoint
 * Supports CORS preflight requests
 * 
 * @returns {NextResponse} Empty JSON response with CORS headers
 */
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow requests from any origin
      'Access-Control-Allow-Methods': 'GET, OPTIONS', // Allow GET and OPTIONS methods
      'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
    },
  });
}