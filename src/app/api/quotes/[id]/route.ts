/**
 * API Endpoint for Quote by ID
 * 
 * This file implements the API endpoint for retrieving a specific quote by its ID
 * Includes validation, error handling, and CORS headers for cross-origin access
 */

import { quotes } from '@/data/quotes';
import { NextResponse } from 'next/server';

/**
 * GET handler for /api/quotes/[id] endpoint
 * Retrieves a specific quote by its ID
 * 
 * @param {Request} request - The incoming request object
 * @param {Object} params - Route parameters containing the quote ID
 * @returns {NextResponse} JSON response with the quote data and CORS headers
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Parse the ID parameter to an integer
  const id = parseInt(params.id);
  
  // Validate that the ID is a valid number
  if (isNaN(id)) {
    return NextResponse.json(
      { error: 'ID must be a number' },
      { status: 400 } // Bad Request status code
    );
  }
  
  // Find the quote with the matching ID
  const quote = quotes.find(q => q.id === id);
  
  // Return 404 error if no quote is found with the given ID
  if (!quote) {
    return NextResponse.json(
      { error: 'Quote not found' },
      { status: 404 } // Not Found status code
    );
  }
  
  // Return the quote as JSON with appropriate CORS headers
  return NextResponse.json(quote, {
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow requests from any origin
      'Access-Control-Allow-Methods': 'GET, OPTIONS', // Allow GET and OPTIONS methods
      'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
    },
  });
}

/**
 * OPTIONS handler for /api/quotes/[id] endpoint
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