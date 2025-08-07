import React from 'react';

/**
 * API Documentation Page Component
 * 
 * This component renders a comprehensive documentation page for the Indonesian Quotes API,
 * providing information about available endpoints, request parameters, response structures,
 * and usage examples.
 * 
 * @returns {JSX.Element} The rendered API documentation page
 */
export default function ApiDocs() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Main container with responsive padding and dark mode support */}
      <div className="max-w-4xl mx-auto">
        {/* Header section with title and description */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dokumentasi API Kutipan Bahasa Indonesia</h1>
          <p className="text-gray-600 dark:text-gray-400">Panduan penggunaan API untuk mengakses kutipan inspiratif dalam Bahasa Indonesia</p>
        </div>

        {/* Introduction section explaining API basics */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Pengenalan</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            API Kutipan Bahasa Indonesia menyediakan akses ke berbagai kutipan inspiratif dalam Bahasa Indonesia.
            Semua endpoint mengembalikan data dalam format JSON dan mendukung CORS untuk penggunaan di aplikasi web.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            URL Dasar: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">https://quotes.liupurnomo.com/api</code>
          </p>
        </div>

        {/* Endpoints section detailing all available API endpoints */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Endpoint</h2>
          
          {/* Endpoint 1: Get All Quotes */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">1. Mendapatkan Semua Kutipan</h3>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded mb-2">
              <code>GET /api/quotes</code>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Mengembalikan daftar semua kutipan yang tersedia.</p>
            <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Parameter Query:</strong></p>
            <ul className="list-disc pl-5 mb-2 text-gray-700 dark:text-gray-300">
              <li><code>category</code> (opsional) - Filter kutipan berdasarkan kategori</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Contoh:</strong></p>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <code>GET /api/quotes?category=motivasi</code>
            </div>
          </div>

          {/* Endpoint 2: Get Random Quote */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">2. Mendapatkan Kutipan Acak</h3>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded mb-2">
              <code>GET /api/quotes/random</code>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Mengembalikan satu kutipan acak.</p>
            <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Parameter Query:</strong></p>
            <ul className="list-disc pl-5 mb-2 text-gray-700 dark:text-gray-300">
              <li><code>category</code> (opsional) - Filter kutipan acak berdasarkan kategori</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Contoh:</strong></p>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <code>GET /api/quotes/random?category=inspirasi</code>
            </div>
          </div>

          {/* Endpoint 3: Get Quote by ID */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">3. Mendapatkan Kutipan Berdasarkan ID</h3>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded mb-2">
              <code>GET /api/quotes/{'{id}'}</code>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Mengembalikan kutipan dengan ID tertentu.</p>
            <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Parameter Path:</strong></p>
            <ul className="list-disc pl-5 mb-2 text-gray-700 dark:text-gray-300">
              <li><code>id</code> (wajib) - ID kutipan yang ingin diambil</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Contoh:</strong></p>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <code>GET /api/quotes/5</code>
            </div>
          </div>

          {/* Endpoint 4: Get Categories List */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">4. Mendapatkan Daftar Kategori</h3>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded mb-2">
              <code>GET /api/categories</code>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Mengembalikan daftar semua kategori yang tersedia.</p>
            <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Contoh:</strong></p>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <code>GET /api/categories</code>
            </div>
          </div>
        </div>

        {/* Usage Examples section showing how to use the API */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Contoh Penggunaan</h2>
          
          {/* Example using Fetch API */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Menggunakan Fetch API</h3>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <pre className="text-sm">
                {`fetch('https://quotes.liupurnomo.com/api/quotes/random')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`}
              </pre>
            </div>
          </div>
        </div>

        {/* Response Structure section showing the format of API responses */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Struktur Respons</h2>
          
          {/* Quote response example */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Kutipan</h3>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <pre className="text-sm">
                {`{
  "id": 1,
  "text": "Pendidikan adalah senjata paling mematikan di dunia, karena dengan pendidikan, Anda dapat mengubah dunia.",
  "author": "Nelson Mandela",
  "category": "pendidikan"
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer with copyright information */}
        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} API Kutipan Bahasa Indonesia | Dibuat oleh <a href="https://liupurnomo.com" className="underline hover:text-gray-400">Liu Purnomo</a></p>
          <p className="mt-1"><a href="mailto:hi@liupurnomo.com" className="underline hover:text-gray-400">hi@liupurnomo.com</a></p>
        </footer>
      </div>
    </div>
  );
}