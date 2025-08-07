/**
 * Indonesian Quotes Data Module
 * This module contains the data structure and collection of Indonesian inspirational quotes
 */

/**
 * Quote Interface
 * Defines the structure of a quote object
 * 
 * @property {number} id - Unique identifier for the quote
 * @property {string} text - The quote text in Indonesian
 * @property {string} author - The author or source of the quote
 * @property {string} category - The category the quote belongs to (e.g., motivasi, pendidikan, inspirasi)
 */
export interface Quote {
  id: number;
  text: string;
  author: string;
  category: string;
}

/**
 * Collection of Indonesian Quotes
 * 
 * This array contains a collection of inspirational quotes in Indonesian language.
 * Each quote has a unique ID, the quote text, author name, and a category.
 * 
 * Categories include:
 * - motivasi (motivation)
 * - pendidikan (education)
 * - inspirasi (inspiration)
 * 
 * This data serves as the source for the quotes API endpoints.
 */
export const quotes: Quote[] = [
  {
    id: 1,
    text: "Pendidikan adalah senjata paling mematikan di dunia, karena dengan pendidikan, Anda dapat mengubah dunia.",
    author: "Nelson Mandela",
    category: "pendidikan"
  },
  {
    id: 2,
    text: "Hidup itu seperti bersepeda. Untuk menjaga keseimbangan, kamu harus terus bergerak.",
    author: "Albert Einstein",
    category: "motivasi"
  },
  {
    id: 3,
    text: "Jangan pernah menyerah pada mimpimu hanya karena waktu yang diperlukan untuk mewujudkannya.",
    author: "Earl Nightingale",
    category: "motivasi"
  },
  {
    id: 4,
    text: "Keberhasilan adalah kemampuan untuk bergerak dari kegagalan ke kegagalan tanpa kehilangan antusiasme.",
    author: "Winston Churchill",
    category: "motivasi"
  },
  {
    id: 5,
    text: "Buku adalah jendela dunia.",
    author: "Pepatah Indonesia",
    category: "pendidikan"
  },
  {
    id: 6,
    text: "Jadilah perubahan yang ingin kamu lihat di dunia.",
    author: "Mahatma Gandhi",
    category: "inspirasi"
  },
  {
    id: 7,
    text: "Kesuksesan bukanlah kunci kebahagiaan. Kebahagiaan adalah kunci kesuksesan.",
    author: "Albert Schweitzer",
    category: "inspirasi"
  },
  {
    id: 8,
    text: "Masa depan tergantung pada apa yang kita lakukan hari ini.",
    author: "Mahatma Gandhi",
    category: "inspirasi"
  },
  {
    id: 9,
    text: "Jangan takut gagal. Takutlah untuk tidak mencoba.",
    author: "Roy T. Bennett",
    category: "motivasi"
  },
  {
    id: 10,
    text: "Ilmu itu seperti udara, ia begitu banyak di sekitar kita, namun tidak berguna jika tidak kita hirup.",
    author: "Anies Baswedan",
    category: "pendidikan"
  },
  {
    id: 11,
    text: "Jangan menunggu. Tidak akan pernah ada waktu yang tepat.",
    author: "Napoleon Hill",
    category: "motivasi"
  },
  {
    id: 12,
    text: "Kegagalan adalah kesempatan untuk memulai lagi dengan lebih cerdas.",
    author: "Henry Ford",
    category: "motivasi"
  },
  {
    id: 13,
    text: "Hidup adalah 10% apa yang terjadi padamu dan 90% bagaimana kamu meresponnya.",
    author: "Charles R. Swindoll",
    category: "inspirasi"
  },
  {
    id: 14,
    text: "Orang bijak belajar ketika mereka bisa. Orang bodoh belajar ketika mereka terpaksa.",
    author: "Arthur Wellesley",
    category: "pendidikan"
  },
  {
    id: 15,
    text: "Jika kamu ingin hidup bahagia, kaitkan dirimu dengan tujuan, bukan dengan orang atau benda.",
    author: "Albert Einstein",
    category: "inspirasi"
  }
];