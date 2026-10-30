import { NextResponse } from 'next/server';
import { imageSearchRateLimit, getClientIP } from '@/lib/rateLimit';
import { trackUnsplashDownload } from '@/lib/stockPhotos';

export async function POST(request: Request) {
  try {
    const clientIP = getClientIP(request);
    if (!imageSearchRateLimit.isAllowed(clientIP).allowed) {
      return NextResponse.json({
        status: 'ERROR',
        message: 'Terlalu banyak permintaan. Coba lagi dalam beberapa saat.',
      }, { status: 429 });
    }

    const { photoId } = await request.json();

    if (typeof photoId !== 'string' || !/^[\w-]+$/.test(photoId)) {
      return NextResponse.json({
        status: 'ERROR',
        message: 'ID foto tidak valid',
      }, { status: 400 });
    }

    await trackUnsplashDownload(photoId);

    return NextResponse.json({
      status: 'SUCCESS',
      message: 'Download tercatat',
    });
  } catch (error) {
    console.error('Error tracking photo download:', error);
    return NextResponse.json({
      status: 'ERROR',
      message: 'Gagal mencatat download',
    }, { status: 502 });
  }
}
