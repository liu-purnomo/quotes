import { NextResponse } from 'next/server';
import { quotes, Quote } from '@/data/quotes';
import { quotesRateLimit, getClientIP } from '@/lib/rateLimit';

export async function GET(request: Request) {
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

    const { searchParams } = new URL(request.url);
    
    // Query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '5');
    const category = searchParams.get('category');
    const author = searchParams.get('author');
    const authorExact = searchParams.get('authorExact') === 'true';
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'id';
    const sortOrder = searchParams.get('sortOrder') || 'asc';

    // Validate pagination parameters
    if (page < 1 || limit < 1) {
      return NextResponse.json({
        status: 'ERROR',
        message: 'Page dan limit harus lebih besar dari 0',
      }, { status: 400 });
    }

    if (limit > 100) {
      return NextResponse.json({
        status: 'ERROR',
        message: 'Limit maksimal adalah 100',
      }, { status: 400 });
    }

    // Validate sort parameters
    const validSortFields = ['id', 'text', 'author', 'category'];
    if (!validSortFields.includes(sortBy)) {
      return NextResponse.json({
        status: 'ERROR',
        message: 'Field sortBy tidak valid. Gunakan: id, text, author, atau category',
      }, { status: 400 });
    }

    if (!['asc', 'desc'].includes(sortOrder)) {
      return NextResponse.json({
        status: 'ERROR',
        message: 'sortOrder harus asc atau desc',
      }, { status: 400 });
    }

    let filteredQuotes = [...quotes];

    // Filtering
    if (category) {
      filteredQuotes = filteredQuotes.filter(quote => 
        quote.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (author) {
      filteredQuotes = filteredQuotes.filter(quote => 
        authorExact
          ? quote.author === author
          : quote.author.toLowerCase().includes(author.toLowerCase())
      );
    }

    if (search) {
      filteredQuotes = filteredQuotes.filter(quote => 
        quote.text.toLowerCase().includes(search.toLowerCase()) ||
        quote.author.toLowerCase().includes(search.toLowerCase()) ||
        quote.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sorting
    filteredQuotes.sort((a, b) => {
      const aValue = String(a[sortBy as keyof Quote]).toLowerCase();
      const bValue = String(b[sortBy as keyof Quote]).toLowerCase();
      
      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    // Pagination
    const totalItems = filteredQuotes.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedQuotes = filteredQuotes.slice(startIndex, endIndex);

    // Metadata
    const metadata = {
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      filters: {
        category: category || null,
        author: author || null,
        search: search || null,
      },
      sorting: {
        sortBy,
        sortOrder,
      },
    };

    return NextResponse.json({
      status: 'SUCCESS',
      message: 'Quotes berhasil diambil',
      data: paginatedQuotes,
      metadata,
    }, {
      headers: {
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
      }
    });
  } catch {
    return NextResponse.json({
      status: 'ERROR',
      message: 'Gagal mengambil quotes',
    }, { status: 500 });
  }
}
