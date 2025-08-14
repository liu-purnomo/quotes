import { NextResponse } from 'next/server';
import { quotes } from '@/data/quotes';
import { randomQuotesRateLimit, getClientIP } from '@/lib/rateLimit';

export async function GET(request: Request) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimitResult = randomQuotesRateLimit.isAllowed(clientIP);
    
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

    const { searchParams } = new URL(request.url);
    
    // Optional category filter for random quote
    const category = searchParams.get('category');
    
    let availableQuotes = [...quotes];
    
    // Filter by category if provided
    if (category) {
      availableQuotes = quotes.filter(quote => 
        quote.category.toLowerCase().includes(category.toLowerCase())
      );
      
      if (availableQuotes.length === 0) {
        return NextResponse.json({
          status: 'ERROR',
          message: 'Tidak ada quote dengan kategori tersebut',
        }, { status: 404 });
      }
    }
    
    // Get random quote
    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    const randomQuote = availableQuotes[randomIndex];
    
    return NextResponse.json({
      status: 'SUCCESS',
      message: 'Random quote berhasil diambil',
      data: randomQuote,
      metadata: {
        totalAvailable: availableQuotes.length,
        category: category || null,
      },
    }, {
      headers: {
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
      }
    });
  } catch {
    return NextResponse.json({
      status: 'ERROR',
      message: 'Gagal mengambil random quote',
    }, { status: 500 });
  }
}