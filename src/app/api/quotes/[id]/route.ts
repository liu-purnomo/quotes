import { NextResponse } from 'next/server';
import { quotes } from '@/data/quotes';
import { quotesRateLimit, getClientIP } from '@/lib/rateLimit';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Rate limiting
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
        message: 'ID harus berupa angka',
      }, { status: 400 });
    }

    const quote = quotes.find(q => q.id === id);
    
    if (!quote) {
      return NextResponse.json({
        status: 'ERROR',
        message: 'Quote tidak ditemukan',
      }, { status: 404 });
    }

    return NextResponse.json({
      status: 'SUCCESS',
      message: 'Quote berhasil diambil',
      data: quote,
    }, {
      headers: {
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
      }
    });
  } catch {
    return NextResponse.json({
      status: 'ERROR',
      message: 'Gagal mengambil quote',
    }, { status: 500 });
  }
}