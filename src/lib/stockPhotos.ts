export interface StockPhoto {
  id: string;
  source: 'unsplash' | 'pixabay';
  thumbUrl: string;
  imageUrl: string;
  alt: string;
  author: string;
  authorUrl: string;
  sourceUrl: string;
}

interface UnsplashPhoto {
  id: string;
  alt_description: string | null;
  urls: { raw: string; small: string };
  user: { name: string; links: { html: string } };
  links: { html: string };
}

interface PixabayHit {
  id: number;
  pageURL: string;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
  user: string;
  user_id: number;
}

const RESULTS_PER_SOURCE = 12;
const REQUEST_TIMEOUT_MS = 8000;
const SEARCH_CACHE_SECONDS = 3600;
const PIXABAY_CACHE_SECONDS = 86400; // Pixabay's terms require caching responses for 24 hours
const UNSPLASH_REFERRAL = 'utm_source=quotes&utm_medium=referral';
const PROXY_ALLOWED_HOSTS = new Set(['pixabay.com', 'cdn.pixabay.com']);

function proxied(url: string): string {
  return `/api/images/proxy?url=${encodeURIComponent(url)}`;
}

async function searchUnsplash(query: string, accessKey: string): Promise<StockPhoto[]> {
  const params = new URLSearchParams({
    query,
    per_page: RESULTS_PER_SOURCE.toString(),
    content_filter: 'high',
  });

  const response = await fetch(`https://api.unsplash.com/search/photos?${params}`, {
    headers: { Authorization: `Client-ID ${accessKey}`, 'Accept-Version': 'v1' },
    next: { revalidate: SEARCH_CACHE_SECONDS },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Unsplash responded with ${response.status}`);
  }

  const data: { results: UnsplashPhoto[] } = await response.json();

  return data.results.map((photo) => {
    const imageUrl = new URL(photo.urls.raw);
    imageUrl.searchParams.set('w', '2160');
    imageUrl.searchParams.set('fit', 'max');
    imageUrl.searchParams.set('q', '85');
    imageUrl.searchParams.set('fm', 'jpg');

    return {
      id: photo.id,
      source: 'unsplash',
      thumbUrl: photo.urls.small,
      imageUrl: imageUrl.toString(),
      alt: photo.alt_description ?? '',
      author: photo.user.name,
      authorUrl: `${photo.user.links.html}?${UNSPLASH_REFERRAL}`,
      sourceUrl: `https://unsplash.com/?${UNSPLASH_REFERRAL}`,
    };
  });
}

async function searchPixabay(query: string, apiKey: string): Promise<StockPhoto[]> {
  const params = new URLSearchParams({
    key: apiKey,
    q: query.slice(0, 100),
    image_type: 'photo',
    safesearch: 'true',
    per_page: RESULTS_PER_SOURCE.toString(),
  });

  const response = await fetch(`https://pixabay.com/api/?${params}`, {
    next: { revalidate: PIXABAY_CACHE_SECONDS },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Pixabay responded with ${response.status}`);
  }

  const data: { hits: PixabayHit[] } = await response.json();

  // Pixabay does not allow hotlinking and its CDN has no reliable CORS headers,
  // so images go through our proxy to keep the canvas exportable
  return data.hits.map((hit) => ({
    id: hit.id.toString(),
    source: 'pixabay',
    thumbUrl: proxied(hit.webformatURL),
    imageUrl: proxied(hit.largeImageURL),
    alt: hit.tags,
    author: hit.user,
    authorUrl: `https://pixabay.com/users/${hit.user}-${hit.user_id}/`,
    sourceUrl: hit.pageURL,
  }));
}

// Returns null when no provider has an API key configured
export async function searchStockPhotos(query: string): Promise<StockPhoto[] | null> {
  const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;
  const pixabayKey = process.env.PIXABAY_API_KEY;

  const searches: Promise<StockPhoto[]>[] = [];
  if (unsplashKey) searches.push(searchUnsplash(query, unsplashKey));
  if (pixabayKey) searches.push(searchPixabay(query, pixabayKey));

  if (searches.length === 0) return null;

  const results = await Promise.allSettled(searches);
  const fulfilled = results.filter((result) => result.status === 'fulfilled');

  // One provider being down should not hide results from the other
  if (fulfilled.length === 0) {
    throw new Error('All stock photo providers failed');
  }

  return fulfilled.flatMap((result) => result.value);
}

// Unsplash requires this call whenever a photo ends up in a downloaded image
export async function trackUnsplashDownload(photoId: string): Promise<void> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) return;

  await fetch(`https://api.unsplash.com/photos/${encodeURIComponent(photoId)}/download`, {
    headers: { Authorization: `Client-ID ${accessKey}`, 'Accept-Version': 'v1' },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
}

export function isProxyableImageUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && PROXY_ALLOWED_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}
