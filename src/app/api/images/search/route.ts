import { NextResponse } from 'next/server';
import { imageSearchRateLimit, getClientIP } from '@/lib/rateLimit';
import { searchStockPhotos } from '@/lib/stockPhotos';

export async function GET(request: Request) {
  try {
    const clientIP = getClientIP(request);
    const rateLimitResult = imageSearchRateLimit.isAllowed(clientIP);

    if (!rateLimitResult.allowed) {
      return NextResponse.json({
        status: 'ERROR',
        message: 'Terlalu banyak permintaan. Coba lagi dalam beberapa saat.',
      }, { status: 429 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.trim().toLowerCase();

    if (!query) {
      return NextResponse.json({
        status: 'ERROR',
        message: 'Kata kunci pencarian wajib diisi',
      }, { status: 400 });
    }

    const photos = await searchStockPhotos(query);

    if (!photos) {
      return NextResponse.json({
        status: 'ERROR',
        message: 'Pencarian foto belum diaktifkan. Atur UNSPLASH_ACCESS_KEY atau PIXABAY_API_KEY.',
      }, { status: 503 });
    }

    return NextResponse.json({
      status: 'SUCCESS',
      message: 'Foto berhasil diambil',
      data: photos,
    });
  } catch (error) {
    console.error('Error searching stock photos:', error);
    return NextResponse.json({
      status: 'ERROR',
      message: 'Gagal mencari foto',
    }, { status: 502 });
  }
}
