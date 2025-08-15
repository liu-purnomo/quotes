import { NextResponse } from 'next/server';
import { quotes } from '@/data/quotes';
import { quotesRateLimit, getClientIP } from '@/lib/rateLimit';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
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

    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json({
        status: 'ERROR',
        message: 'ID kutipan tidak valid',
      }, { status: 400 });
    }

    // Find current quote index
    const currentIndex = quotes.findIndex(quote => quote.id === id);
    
    if (currentIndex === -1) {
      return NextResponse.json({
        status: 'ERROR',
        message: 'Kutipan tidak ditemukan',
      }, { status: 404 });
    }

    // Get previous and next quotes
    const prev = currentIndex > 0 ? {
      id: quotes[currentIndex - 1].id,
      author: quotes[currentIndex - 1].author
    } : null;
    
    const next = currentIndex < quotes.length - 1 ? {
      id: quotes[currentIndex + 1].id,
      author: quotes[currentIndex + 1].author
    } : null;

    return NextResponse.json({
      status: 'SUCCESS',
      message: 'Navigation berhasil diambil',
      data: {
        prev,
        next
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
      message: 'Gagal mengambil navigation',
    }, { status: 500 });
  }
}