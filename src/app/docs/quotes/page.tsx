import Link from 'next/link';

export default function QuotesDocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/docs" className="text-blue-600 hover:text-blue-800">← Back to Documentation</Link>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-medium">GET</span>
            <h1 className="text-3xl font-bold text-gray-900">/api/quotes</h1>
          </div>
          <p className="text-xl text-gray-600">
            Mengambil daftar quotes dengan fitur pagination, filtering, dan sorting.
          </p>
        </div>

        {/* URL */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">URL</h2>
          <div className="bg-gray-900 rounded p-3">
            <code className="text-green-400">GET /api/quotes</code>
          </div>
        </div>

        {/* Parameters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Query Parameters</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-medium text-gray-900">Parameter</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-900">Type</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-900">Default</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-900">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-2 px-3 font-mono text-blue-600">page</td>
                  <td className="py-2 px-3 text-gray-600">integer</td>
                  <td className="py-2 px-3 text-gray-600">1</td>
                  <td className="py-2 px-3 text-gray-600">Nomor halaman (min: 1)</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono text-blue-600">limit</td>
                  <td className="py-2 px-3 text-gray-600">integer</td>
                  <td className="py-2 px-3 text-gray-600">5</td>
                  <td className="py-2 px-3 text-gray-600">Jumlah items per halaman (min: 1, max: 100)</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono text-blue-600">category</td>
                  <td className="py-2 px-3 text-gray-600">string</td>
                  <td className="py-2 px-3 text-gray-600">-</td>
                  <td className="py-2 px-3 text-gray-600">Filter berdasarkan kategori</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono text-blue-600">author</td>
                  <td className="py-2 px-3 text-gray-600">string</td>
                  <td className="py-2 px-3 text-gray-600">-</td>
                  <td className="py-2 px-3 text-gray-600">Filter berdasarkan penulis</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono text-blue-600">search</td>
                  <td className="py-2 px-3 text-gray-600">string</td>
                  <td className="py-2 px-3 text-gray-600">-</td>
                  <td className="py-2 px-3 text-gray-600">Pencarian di text, author, dan category</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono text-blue-600">sortBy</td>
                  <td className="py-2 px-3 text-gray-600">string</td>
                  <td className="py-2 px-3 text-gray-600">id</td>
                  <td className="py-2 px-3 text-gray-600">Field untuk sorting: id, text, author, category</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono text-blue-600">sortOrder</td>
                  <td className="py-2 px-3 text-gray-600">string</td>
                  <td className="py-2 px-3 text-gray-600">asc</td>
                  <td className="py-2 px-3 text-gray-600">Urutan sorting: asc atau desc</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Example Requests */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Example Requests</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Basic Request</h3>
              <div className="bg-gray-900 rounded p-3 mb-2">
                <code className="text-green-400 text-sm">GET /api/quotes</code>
              </div>
              <p className="text-gray-600 text-sm">Mengambil 5 quotes pertama</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Pagination</h3>
              <div className="bg-gray-900 rounded p-3 mb-2">
                <code className="text-green-400 text-sm">GET /api/quotes?page=2&limit=10</code>
              </div>
              <p className="text-gray-600 text-sm">Mengambil halaman 2 dengan 10 items per halaman</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Filtering</h3>
              <div className="bg-gray-900 rounded p-3 mb-2">
                <code className="text-green-400 text-sm">GET /api/quotes?category=motivasi&author=Einstein</code>
              </div>
              <p className="text-gray-600 text-sm">Filter quotes kategori motivasi dari Einstein</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Search & Sort</h3>
              <div className="bg-gray-900 rounded p-3 mb-2">
                <code className="text-green-400 text-sm">GET /api/quotes?search=hidup&sortBy=author&sortOrder=desc</code>
              </div>
              <p className="text-gray-600 text-sm">Cari quotes dengan kata &ldquo;hidup&rdquo;, sort by author Z-A</p>
            </div>
          </div>
        </div>

        {/* Success Response */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Success Response</h2>
          <div className="mb-3">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">200 OK</span>
          </div>
          <div className="bg-gray-900 rounded p-4">
            <pre className="text-green-400 text-xs overflow-x-auto">
{`{
  "status": "SUCCESS",
  "message": "Quotes berhasil diambil",
  "data": [
    {
      "id": 1,
      "text": "Hidup itu seperti sepeda. Agar tetap seimbang, kamu harus terus bergerak.",
      "author": "Albert Einstein",
      "category": "motivasi"
    },
    {
      "id": 2,
      "text": "Jangan menunggu kesempatan, tapi ciptakanlah kesempatan itu.",
      "author": "George Bernard Shaw",
      "category": "motivasi"
    }
  ],
  "metadata": {
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalItems": 10,
      "itemsPerPage": 5,
      "hasNextPage": true,
      "hasPrevPage": false
    },
    "filters": {
      "category": "motivasi",
      "author": null,
      "search": null
    },
    "sorting": {
      "sortBy": "id",
      "sortOrder": "asc"
    }
  }
}`}
            </pre>
          </div>
        </div>

        {/* Error Responses */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Error Responses</h2>
          
          <div className="space-y-4">
            <div>
              <div className="mb-2">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">400 Bad Request</span>
              </div>
              <div className="bg-gray-900 rounded p-3">
                <pre className="text-red-400 text-xs">
{`{
  "status": "ERROR",
  "message": "Page dan limit harus lebih besar dari 0"
}`}
                </pre>
              </div>
            </div>

            <div>
              <div className="mb-2">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">429 Too Many Requests</span>
              </div>
              <div className="bg-gray-900 rounded p-3">
                <pre className="text-red-400 text-xs">
{`{
  "status": "ERROR",
  "message": "Terlalu banyak permintaan. Coba lagi dalam beberapa saat."
}`}
                </pre>
              </div>
              <p className="text-gray-600 text-sm mt-2">Rate limit: 30 requests per minute</p>
            </div>
          </div>
        </div>

        {/* Response Headers */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Response Headers</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-medium text-gray-900">Header</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-900">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-2 px-3 font-mono text-blue-600">X-RateLimit-Remaining</td>
                  <td className="py-2 px-3 text-gray-600">Sisa requests yang diperbolehkan</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono text-blue-600">X-RateLimit-Reset</td>
                  <td className="py-2 px-3 text-gray-600">Waktu reset rate limit (ISO string)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}