/**
 * API Endpoint for Quotes
 * 
 * This file implements the API endpoints for retrieving quotes data
 * Supports filtering by category and includes CORS headers for cross-origin access
 */

import { quotes } from '@/data/quotes';
import { NextResponse } from 'next/server';

/**
 * GET handler for /api/quotes endpoint
 * Retrieves all quotes or filters by category if specified in query parameters
 * 
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} JSON response with quotes data and CORS headers
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
  
  // Return the filtered quotes as JSON with appropriate CORS headers
  return NextResponse.json(filteredQuotes, {
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow requests from any origin
      'Access-Control-Allow-Methods': 'GET, OPTIONS', // Allow GET and OPTIONS methods
      'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
    },
  });
}

/**
 * OPTIONS handler for /api/quotes endpoint
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