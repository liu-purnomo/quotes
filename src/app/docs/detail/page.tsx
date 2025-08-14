import Link from 'next/link';

export default function DetailDocsPage() {
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
            <h1 className="text-3xl font-bold text-gray-900">/api/quotes/:id</h1>
          </div>
          <p className="text-xl text-gray-600">
            Mengambil quote spesifik berdasarkan ID.
          </p>
        </div>

        {/* URL */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">URL</h2>
          <div className="bg-gray-900 rounded p-3">
            <code className="text-green-400">GET /api/quotes/:id</code>
          </div>
        </div>

        {/* Parameters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Path Parameters</h2>
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
                  <td className="py-2 px-3 font-mono text-blue-600">id</td>
                  <td className="py-2 px-3 text-gray-600">integer</td>
                  <td className="py-2 px-3 text-gray-600">Yes</td>
                  <td className="py-2 px-3 text-gray-600">ID unique dari quote yang ingin diambil</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400">
            <p className="text-blue-800 text-sm">
              <strong>Available IDs:</strong> 1-10 (berdasarkan data saat ini)
            </p>
          </div>
        </div>

        {/* Example Requests */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Example Requests</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Get Quote by ID</h3>
              <div className="bg-gray-900 rounded p-3 mb-2">
                <code className="text-green-400 text-sm">GET /api/quotes/1</code>
              </div>
              <p className="text-gray-600 text-sm">Mengambil quote dengan ID 1</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Different Quote IDs</h3>
              <div className="space-y-2">
                <div className="bg-gray-900 rounded p-3">
                  <code className="text-green-400 text-sm">GET /api/quotes/5</code>
                </div>
                <div className="bg-gray-900 rounded p-3">
                  <code className="text-green-400 text-sm">GET /api/quotes/10</code>
                </div>
              </div>
              <p className="text-gray-600 text-sm">Setiap ID memberikan quote yang unik dan konsisten</p>
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
  "message": "Quote berhasil diambil",
  "data": {
    "id": 1,
    "text": "Hidup itu seperti sepeda. Agar tetap seimbang, kamu harus terus bergerak.",
    "author": "Albert Einstein",
    "category": "motivasi"
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
              <div className="bg-gray-900 rounded p-3 mb-2">
                <pre className="text-red-400 text-xs">
{`{
  "status": "ERROR",
  "message": "ID harus berupa angka"
}`}
                </pre>
              </div>
              <p className="text-gray-600 text-sm">Terjadi ketika ID bukan angka valid</p>
              <div className="mt-2 bg-gray-100 p-2 rounded text-xs">
                <code>GET /api/quotes/abc ❌</code>
              </div>
            </div>

            <div>
              <div className="mb-2">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">404 Not Found</span>
              </div>
              <div className="bg-gray-900 rounded p-3 mb-2">
                <pre className="text-red-400 text-xs">
{`{
  "status": "ERROR",
  "message": "Quote tidak ditemukan"
}`}
                </pre>
              </div>
              <p className="text-gray-600 text-sm">Terjadi ketika ID tidak ada dalam database</p>
              <div className="mt-2 bg-gray-100 p-2 rounded text-xs">
                <code>GET /api/quotes/999 ❌</code>
              </div>
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
              <p className="text-gray-600 text-sm">Rate limit: 30 requests per minute</p>
            </div>

            <div>
              <div className="mb-2">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">500 Internal Server Error</span>
              </div>
              <div className="bg-gray-900 rounded p-3">
                <pre className="text-red-400 text-xs">
{`{
  "status": "ERROR",
  "message": "Gagal mengambil quote"
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
              <h3 className="font-semibold text-gray-900 mb-2">🔗 Direct Link Sharing</h3>
              <p className="text-gray-600 text-sm mb-2">Share specific quote via URL</p>
              <div className="bg-gray-100 p-2 rounded text-xs">
                <code>https://yourapp.com/quote/5</code>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">📱 Bookmarking System</h3>
              <p className="text-gray-600 text-sm mb-2">Save favorite quotes by ID</p>
              <div className="bg-gray-100 p-2 rounded text-xs">
                <code>favoriteQuotes = [1, 5, 8]</code>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">🔄 Sequential Display</h3>
              <p className="text-gray-600 text-sm mb-2">Show quotes in specific order</p>
              <div className="bg-gray-100 p-2 rounded text-xs">
                <code>for (let i = 1; i &lt;= 10; i++) fetch(`/api/quotes/$&#123;i&#125;`)</code>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">✅ Data Validation</h3>
              <p className="text-gray-600 text-sm mb-2">Check if quote exists before processing</p>
              <div className="bg-gray-100 p-2 rounded text-xs">
                <code>if (response.status === &apos;SUCCESS&apos;) processQuote(data)</code>
              </div>
            </div>
          </div>
        </div>

        {/* Available Quote IDs */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Available Quote IDs</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[1,2,3,4,5,6,7,8,9,10].map(id => (
              <div key={id} className="bg-blue-50 border border-blue-200 rounded p-3 text-center">
                <div className="font-mono text-blue-600 font-bold">{id}</div>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-sm mt-3">
            Setiap ID menghasilkan quote yang sama setiap kali dipanggil (konsisten).
          </p>
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