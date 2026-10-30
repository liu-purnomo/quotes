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

    const { searchParams } = new URL(request.url);
    const counts = new Map<string, number>();
    for (const { category } of quotes) counts.set(category, (counts.get(category) ?? 0) + 1);

    // ?sort=popular lists the biggest categories first
    const categories = searchParams.get('sort') === 'popular'
      ? Array.from(counts.keys()).sort((a, b) => counts.get(b)! - counts.get(a)!)
      : Array.from(counts.keys()).sort();

    return NextResponse.json({
      status: 'SUCCESS',
      message: 'Categories berhasil diambil',
      data: categories,
    }, {
      headers: {
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
      }
    });
  } catch {
    return NextResponse.json({
      status: 'ERROR',
      message: 'Gagal mengambil categories',
    }, { status: 500 });
  }
}