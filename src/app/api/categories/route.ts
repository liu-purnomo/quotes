/**
 * API Endpoint for Categories
 * 
 * This file implements the API endpoint for retrieving all available quote categories
 * Includes CORS headers for cross-origin access
 */

import { quotes } from '@/data/quotes';
import { NextResponse } from 'next/server';

/**
 * GET handler for /api/categories endpoint
 * Retrieves a list of all unique categories from the quotes data
 * 
 * @returns {NextResponse} JSON response with array of category names and CORS headers
 */
export async function GET() {
  // Extract unique categories from the quotes data using Set
  const uniqueCategories = Array.from(new Set(quotes.map(quote => quote.category)));
  
  // Return the unique categories as JSON with appropriate CORS headers
  return NextResponse.json(uniqueCategories, {
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow requests from any origin
      'Access-Control-Allow-Methods': 'GET, OPTIONS', // Allow GET and OPTIONS methods
      'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
    },
  });
}

/**
 * OPTIONS handler for /api/categories endpoint
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