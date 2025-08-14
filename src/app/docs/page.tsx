import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Quotes API Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            API untuk mengakses koleksi quotes inspiratif bahasa Indonesia dengan fitur pencarian, pagination, dan rate limiting.
          </p>
        </div>

        {/* Quick Start */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Start</h2>
          <div className="bg-gray-900 rounded-lg p-4 mb-4">
            <code className="text-green-400">
              GET https://quotes.liupurnomo.com/api/quotes/random
            </code>
          </div>
          <p className="text-gray-600">
            Mulai dengan mengambil quote random untuk mendapatkan inspirasi harian Anda.
          </p>
        </div>

        {/* Base URL */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Base URL</h2>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <code className="text-blue-800 font-mono">
              https://quotes.liupurnomo.com/api
            </code>
          </div>
        </div>

        {/* Authentication */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication</h2>
          <p className="text-gray-600 mb-4">
            API ini tidak memerlukan authentication. Semua endpoint dapat diakses secara publik.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-yellow-800">
              <strong>Rate Limiting:</strong> Terdapat rate limiting per IP address untuk mencegah abuse.
            </p>
          </div>
        </div>

        {/* Rate Limiting */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Rate Limiting</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Standard Endpoints</h3>
              <p className="text-gray-600 text-sm mb-2">30 requests per minute</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• GET /api/quotes</li>
                <li>• GET /api/quotes/:id</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Random Endpoint</h3>
              <p className="text-gray-600 text-sm mb-2">60 requests per minute</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• GET /api/quotes/random</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-400">
            <p className="text-red-800 text-sm">
              <strong>HTTP 429:</strong> Akan dikembalikan jika rate limit terlewati.
            </p>
          </div>
        </div>

        {/* Response Format */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Response Format</h2>
          <p className="text-gray-600 mb-4">Semua response menggunakan format JSON yang konsisten:</p>
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-green-400 text-sm overflow-x-auto">
{`{
  "status": "SUCCESS" | "ERROR",
  "message": "Pesan deskriptif",
  "data": {...} | [...],
  "metadata": {...} // Optional
}`}
            </pre>
          </div>
        </div>

        {/* Endpoints Overview */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">API Endpoints</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">GET</span>
                <code className="text-gray-900 font-mono">/api/quotes</code>
              </div>
              <p className="text-gray-600 text-sm">
                Mengambil daftar quotes dengan fitur pagination, filtering, dan sorting.
              </p>
            </div>
            
            <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">GET</span>
                <code className="text-gray-900 font-mono">/api/quotes/random</code>
              </div>
              <p className="text-gray-600 text-sm">
                Mengambil satu quote secara random, dengan optional filter berdasarkan kategori.
              </p>
            </div>
            
            <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">GET</span>
                <code className="text-gray-900 font-mono">/api/quotes/:id</code>
              </div>
              <p className="text-gray-600 text-sm">
                Mengambil quote spesifik berdasarkan ID.
              </p>
            </div>
          </div>
        </div>

        {/* Data Schema */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quote Schema</h2>
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-green-400 text-sm overflow-x-auto">
{`{
  "id": number,
  "text": string,
  "author": string,
  "category": string
}`}
            </pre>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold text-gray-900 mb-2">Available Categories:</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">motivasi</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">kesuksesan</span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">kehidupan</span>
              <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs">cinta</span>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">pendidikan</span>
              <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">kebahagiaan</span>
            </div>
          </div>
        </div>

        {/* Navigation to detailed docs */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Detailed Documentation</h2>
          <p className="mb-6 opacity-90">
            Lihat dokumentasi lengkap dengan contoh request dan response untuk setiap endpoint.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/docs/quotes" className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              GET /api/quotes
            </Link>
            <Link href="/docs/random" className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              GET /api/quotes/random
            </Link>
            <Link href="/docs/detail" className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              GET /api/quotes/:id
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}