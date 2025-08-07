# Changelog

Semua perubahan penting pada proyek ini akan didokumentasikan dalam file ini.

## [0.1.0] - 2024-08-15

### Ditambahkan
- Implementasi awal API Kutipan Bahasa Indonesia
- Endpoint API: `/api/quotes`, `/api/quotes/random`, `/api/quotes/[id]`, `/api/categories`
- Dokumentasi API di `/api/docs`
- Halaman utama dengan fitur filter kategori dan tampilan kutipan acak
- Dukungan CORS untuk penggunaan API dari domain lain
- Konfigurasi ESLint dan Prettier untuk standar kode
- Konfigurasi Husky dan lint-staged untuk pre-commit hooks
- Workflow CI untuk pengujian otomatis

### Dokumentasi
- Panduan kontribusi (CONTRIBUTING.md)
- Kode etik (CODE_OF_CONDUCT.md)
- Template untuk pull request dan issue
- Komentar kode dalam bahasa Inggris untuk memudahkan kontribusi
- Dokumentasi README yang komprehensif

### Teknis
- Menggunakan Next.js 15 dengan App Router
- Styling dengan Tailwind CSS 4
- TypeScript untuk type safety
- Responsive design untuk berbagai ukuran layar