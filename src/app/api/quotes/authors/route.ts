import { NextResponse } from 'next/server';
import { quotes } from '@/data/quotes';
import { quotesRateLimit, getClientIP } from '@/lib/rateLimit';

export async function GET(request: Request) {
  try {
    const clientIP = getClientIP(request);
    const rateLimitResult = quotesRateLimit.isAllowed(clientIP);
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json({
        status: 'ERROR',
        message: 'Terlalu banyak permintaan. Coba lagi dalam beberapa saat.',
      }, { 
        status: 429,
        headers: {
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
        }
      });
    }

    const authors = Array.from(new Set(quotes.map(quote => quote.author))).sort();

    return NextResponse.json({
      status: 'SUCCESS',
      message: 'Authors berhasil diambil',
      data: authors,
    }, {
      headers: {
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
      }
    });
  } catch {
    return NextResponse.json({
      status: 'ERROR',
      message: 'Gagal mengambil authors',
    }, { status: 500 });
  }
}