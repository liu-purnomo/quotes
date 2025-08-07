# API Kutipan Bahasa Indonesia

API sederhana yang menyediakan kutipan inspiratif dalam Bahasa Indonesia. Dibangun dengan Next.js dan Tailwind CSS.

[![CI](https://github.com/liu-purnomo/quotes/actions/workflows/ci.yml/badge.svg)](https://github.com/liu-purnomo/quotes/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Fitur

- Mendapatkan daftar kutipan inspiratif dalam Bahasa Indonesia
- Filter kutipan berdasarkan kategori
- Mendapatkan kutipan acak
- Mendapatkan kutipan berdasarkan ID
- Mendapatkan daftar kategori yang tersedia
- Antarmuka web untuk menjelajahi kutipan
- Dokumentasi API yang lengkap

## Endpoint API

- `GET /api/quotes` - Mendapatkan semua kutipan
- `GET /api/quotes?category={category}` - Mendapatkan kutipan berdasarkan kategori
- `GET /api/quotes/random` - Mendapatkan kutipan acak
- `GET /api/quotes/random?category={category}` - Mendapatkan kutipan acak dari kategori tertentu
- `GET /api/quotes/{id}` - Mendapatkan kutipan berdasarkan ID
- `GET /api/categories` - Mendapatkan daftar kategori yang tersedia

## Cara Penggunaan

### Instalasi

```bash
# Clone repositori
git clone https://github.com/liu-purnomo/quotes.git
cd quotes

# Instal dependensi
npm install

# Jalankan server pengembangan
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

### Deployment

Aplikasi ini dapat di-deploy ke platform seperti Vercel, Netlify, atau layanan hosting lainnya yang mendukung Next.js.

```bash
# Build untuk produksi
npm run build

# Jalankan build produksi
npm start
```

## Contoh Penggunaan API

### Menggunakan Fetch API

```javascript
// Mendapatkan kutipan acak
fetch('https://quotes.liupurnomo.com/api/quotes/random')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Mendapatkan kutipan dari kategori tertentu
fetch('https://quotes.liupurnomo.com/api/quotes?category=motivasi')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

## Struktur Respons

### Kutipan

```json
{
  "id": 1,
  "text": "Pendidikan adalah senjata paling mematikan di dunia, karena dengan pendidikan, Anda dapat mengubah dunia.",
  "author": "Nelson Mandela",
  "category": "pendidikan"
}
```

### Daftar Kategori

```json
["pendidikan", "motivasi", "inspirasi"]
```

## Teknologi yang Digunakan

- [Next.js](https://nextjs.org/) - Framework React untuk aplikasi web
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS untuk desain
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript dengan tipe statis

## Kontribusi

Kami sangat menghargai kontribusi dari komunitas! Jika Anda ingin berkontribusi pada proyek ini, silakan baca [CONTRIBUTING.md](CONTRIBUTING.md) untuk detail tentang proses pengiriman pull request kepada kami.

### Konvensi Kode

Proyek ini menggunakan beberapa konvensi kode untuk menjaga konsistensi:

- **TypeScript**: Semua kode ditulis dalam TypeScript dengan tipe yang tepat
- **ESLint & Prettier**: Kode diformat menggunakan Prettier dan diperiksa dengan ESLint
- **Komentar**: Semua kode memiliki komentar dalam bahasa Inggris untuk memudahkan kontribusi internasional
- **Komponen**: Menggunakan functional components dengan hooks
- **Tailwind CSS**: Styling menggunakan kelas Tailwind
- **API**: Mengikuti prinsip RESTful dengan penanganan error yang tepat

### Alur Kerja Pengembangan

1. Fork repositori
2. Buat branch fitur (`git checkout -b feature/amazing-feature`)
3. Commit perubahan Anda (`git commit -m 'Add some amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buka Pull Request

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.

## Kontak

Liu Purnomo - [hi@liupurnomo.com](mailto:hi@liupurnomo.com)

Website: [liupurnomo.com](https://liupurnomo.com)

URL Proyek: [https://github.com/liu-purnomo/quotes](https://github.com/liu-purnomo/quotes)

API URL: [https://quotes.liupurnomo.com](https://quotes.liupurnomo.com)
