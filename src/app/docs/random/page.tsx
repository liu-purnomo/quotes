import Link from 'next/link';

export default function RandomDocsPage() {
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
            <h1 className="text-3xl font-bold text-gray-900">/api/quotes/random</h1>
          </div>
          <p className="text-xl text-gray-600">
            Mengambil satu quote secara random dari koleksi, dengan optional filter berdasarkan kategori.
          </p>
        </div>

        {/* URL */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">URL</h2>
          <div className="bg-gray-900 rounded p-3">
            <code className="text-green-400">GET /api/quotes/random</code>
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
                  <th className="text-left py-2 px-3 font-medium text-gray-900">Required</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-900">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-2 px-3 font-mono text-blue-600">category</td>
                  <td className="py-2 px-3 text-gray-600">string</td>
                  <td className="py-2 px-3 text-gray-600">No</td>
                  <td className="py-2 px-3 text-gray-600">Filter random quote berdasarkan kategori</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400">
            <p className="text-blue-800 text-sm">
              <strong>Available Categories:</strong> motivasi, kesuksesan, kehidupan, cinta, pendidikan, kebahagiaan
            </p>
          </div>
        </div>

        {/* Example Requests */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Example Requests</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Random Quote (Any Category)</h3>
              <div className="bg-gray-900 rounded p-3 mb-2">
                <code className="text-green-400 text-sm">GET /api/quotes/random</code>
              </div>
              <p className="text-gray-600 text-sm">Mengambil 1 quote random dari semua kategori</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Random Quote by Category</h3>
              <div className="bg-gray-900 rounded p-3 mb-2">
                <code className="text-green-400 text-sm">GET /api/quotes/random?category=motivasi</code>
              </div>
              <p className="text-gray-600 text-sm">Mengambil 1 quote random dari kategori motivasi</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Multiple Categories</h3>
              <div className="bg-gray-900 rounded p-3 mb-2">
                <code className="text-green-400 text-sm">GET /api/quotes/random?category=cinta</code>
              </div>
              <p className="text-gray-600 text-sm">Mengambil 1 quote random dari kategori cinta</p>
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
  "message": "Random quote berhasil diambil",
  "data": {
    "id": 5,
    "text": "Impian tidak akan berubah menjadi kenyataan melalui keajaiban; itu butuh keringat, tekad, dan kerja keras.",
    "author": "Colin Powell",
    "category": "motivasi"
  },
  "metadata": {
    "totalAvailable": 4,
    "category": "motivasi"
  }
}`}
            </pre>
          </div>
          <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-400">
            <p className="text-green-800 text-sm">
              <strong>Note:</strong> Response akan berbeda setiap kali karena quote dipilih secara random.
            </p>
          </div>
        </div>

        {/* Error Responses */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Error Responses</h2>
          
          <div className="space-y-4">
            <div>
              <div className="mb-2">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">404 Not Found</span>
              </div>
              <div className="bg-gray-900 rounded p-3 mb-2">
                <pre className="text-red-400 text-xs">
{`{
  "status": "ERROR",
  "message": "Tidak ada quote dengan kategori tersebut"
}`}
                </pre>
              </div>
              <p className="text-gray-600 text-sm">Terjadi ketika kategori yang diminta tidak memiliki quotes</p>
            </div>

            <div>
              <div className="mb-2">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">429 Too Many Requests</span>
              </div>
              <div className="bg-gray-900 rounded p-3 mb-2">
                <pre className="text-red-400 text-xs">
{`{
  "status": "ERROR",
  "message": "Terlalu banyak permintaan. Coba lagi dalam beberapa saat."
}`}
                </pre>
              </div>
              <p className="text-gray-600 text-sm">Rate limit: 60 requests per minute (lebih tinggi untuk slideshow)</p>
            </div>

            <div>
              <div className="mb-2">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">500 Internal Server Error</span>
              </div>
              <div className="bg-gray-900 rounded p-3">
                <pre className="text-red-400 text-xs">
{`{
  "status": "ERROR",
  "message": "Gagal mengambil random quote"
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Common Use Cases</h2>
          <div className="grid gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">🎯 Daily Inspiration App</h3>
              <p className="text-gray-600 text-sm mb-2">Menampilkan quote inspirasi harian</p>
              <div className="bg-gray-100 p-2 rounded text-xs">
                <code>GET /api/quotes/random</code>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">🎬 Slideshow Presentation</h3>
              <p className="text-gray-600 text-sm mb-2">Auto-refresh quotes dalam slideshow</p>
              <div className="bg-gray-100 p-2 rounded text-xs">
                <code>setInterval(() =&gt; fetch(&lsquo;/api/quotes/random&rsquo;), 5000)</code>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">🎨 Themed Content</h3>
              <p className="text-gray-600 text-sm mb-2">Quotes sesuai tema atau mood</p>
              <div className="bg-gray-100 p-2 rounded text-xs">
                <code>GET /api/quotes/random?category=motivasi</code>
              </div>
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
                  <td className="py-2 px-3 text-gray-600">Sisa requests yang diperbolehkan (dari 60/minute)</td>
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