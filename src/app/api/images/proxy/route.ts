import { NextResponse } from 'next/server';
import { imageProxyRateLimit, getClientIP } from '@/lib/rateLimit';
import { isProxyableImageUrl } from '@/lib/stockPhotos';

const MAX_IMAGE_BYTES = 15 * 1024 * 1024;
const ALLOWED_CONTENT_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

function errorResponse(message: string, status: number) {
  return NextResponse.json({ status: 'ERROR', message }, { status });
}

export async function GET(request: Request) {
  try {
    const clientIP = getClientIP(request);
    if (!imageProxyRateLimit.isAllowed(clientIP).allowed) {
      return errorResponse('Terlalu banyak permintaan. Coba lagi dalam beberapa saat.', 429);
    }

    const { searchParams } = new URL(request.url);
    const target = searchParams.get('url');

    if (!target || !isProxyableImageUrl(target)) {
      return errorResponse('URL gambar tidak valid', 400);
    }

    // Redirects are rejected so an allowed host cannot point us somewhere else
    const upstream = await fetch(target, {
      redirect: 'error',
      signal: AbortSignal.timeout(10000),
    });

    const contentType = upstream.headers.get('content-type')?.split(';')[0].trim() ?? '';
    const contentLength = Number(upstream.headers.get('content-length') ?? 0);

    if (!upstream.ok || !upstream.body || !ALLOWED_CONTENT_TYPES.has(contentType)) {
      return errorResponse('Gambar tidak tersedia', 502);
    }

    if (contentLength > MAX_IMAGE_BYTES) {
      return errorResponse('Ukuran gambar terlalu besar', 413);
    }

    return new Response(upstream.body, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('Error proxying image:', error);
    return errorResponse('Gagal mengambil gambar', 502);
  }
}
