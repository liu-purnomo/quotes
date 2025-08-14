export interface Quote {
  id: number;
  text: string;
  author: string;
  category: string;
}

export const quotes: Quote[] = [
  // Motivasi - Tokoh Dunia
  {
    id: 1,
    text: "Hidup itu seperti sepeda. Agar tetap seimbang, kamu harus terus bergerak.",
    author: "Albert Einstein",
    category: "motivasi"
  },
  {
    id: 2,
    text: "Jangan menunggu kesempatan, tapi ciptakanlah kesempatan itu.",
    author: "George Bernard Shaw",
    category: "motivasi"
  },
  {
    id: 3,
    text: "Impian tidak akan berubah menjadi kenyataan melalui keajaiban; itu butuh keringat, tekad, dan kerja keras.",
    author: "Colin Powell",
    category: "motivasi"
  },
  {
    id: 4,
    text: "Kegagalan adalah kesempatan untuk memulai lagi dengan lebih cerdas.",
    author: "Henry Ford",
    category: "motivasi"
  },
  {
    id: 5,
    text: "Cara terbaik untuk memulai adalah berhenti berbicara dan mulai melakukan.",
    author: "Walt Disney",
    category: "motivasi"
  },
  {
    id: 6,
    text: "Jika kamu tidak dapat melakukan hal-hal besar, lakukan hal-hal kecil dengan cara yang besar.",
    author: "Napoleon Hill",
    category: "motivasi"
  },
  {
    id: 7,
    text: "Kesuksesan bukanlah kunci kebahagiaan. Kebahagiaan adalah kunci kesuksesan.",
    author: "Albert Schweitzer",
    category: "motivasi"
  },
  {
    id: 8,
    text: "Jangan takut menyerah pada hal yang baik demi mengejar hal yang hebat.",
    author: "John D. Rockefeller",
    category: "motivasi"
  },
  {
    id: 9,
    text: "Masa depan milik mereka yang percaya pada keindahan mimpi mereka.",
    author: "Eleanor Roosevelt",
    category: "motivasi"
  },
  {
    id: 10,
    text: "Jangan menunggu; waktu tidak akan pernah tepat.",
    author: "Napoleon Hill",
    category: "motivasi"
  },

  // Motivasi - Tokoh Indonesia
  {
    id: 11,
    text: "Berikan aku 1000 orang tua, niscaya akan kucabut semeru dari akarnya. Berikan aku 10 pemuda, niscaya akan kuguncangkan dunia.",
    author: "Soekarno",
    category: "motivasi"
  },
  {
    id: 12,
    text: "Jadilah seperti karang di lautan yang kuat diterpa ombak dan keruhnya air laut, namun ia tetap tegar dan kukuh berdiri.",
    author: "Soekarno",
    category: "motivasi"
  },
  {
    id: 13,
    text: "Perjuanganku lebih mudah karena mengusir penjajah, tapi perjuanganmu akan lebih sulit karena melawan bangsamu sendiri.",
    author: "Soekarno",
    category: "motivasi"
  },
  {
    id: 14,
    text: "Belajarlah dengan rajin agar kelak kamu menjadi orang yang berguna bagi nusa dan bangsa.",
    author: "B.J. Habibie",
    category: "motivasi"
  },
  {
    id: 15,
    text: "Masa depan dan kemajuan bangsa terletak di tangan para pemudanya.",
    author: "Soekarno",
    category: "motivasi"
  },

  // Anime Quotes - Motivasi
  {
    id: 16,
    text: "Jika kamu tidak suka nasibmu, jangan terima begitu saja. Kamu punya kekuatan untuk mengubahnya.",
    author: "Naruto Uzumaki",
    category: "motivasi"
  },
  {
    id: 17,
    text: "Tidak apa-apa kalah, asalkan kamu tidak menyerah.",
    author: "Monkey D. Luffy",
    category: "motivasi"
  },
  {
    id: 18,
    text: "Bahkan jika kamu kehilangan segalanya, selalu ada sesuatu yang tersisa. Dan dari situlah kamu mulai lagi.",
    author: "Edward Elric",
    category: "motivasi"
  },
  {
    id: 19,
    text: "Orang kuat bukanlah yang tidak pernah jatuh, tapi yang bangkit setiap kali jatuh.",
    author: "All Might",
    category: "motivasi"
  },
  {
    id: 20,
    text: "Jangan pernah menyerah, karena itulah cara ninjaku.",
    author: "Naruto Uzumaki",
    category: "motivasi"
  },

  // Kesuksesan
  {
    id: 21,
    text: "Kesuksesan adalah perjalanan, bukan tujuan.",
    author: "Ben Sweetland",
    category: "kesuksesan"
  },
  {
    id: 22,
    text: "Kesuksesan datang kepada mereka yang berani memulai.",
    author: "John A. Shedd",
    category: "kesuksesan"
  },
  {
    id: 23,
    text: "Jalan menuju kesuksesan selalu dalam tahap konstruksi.",
    author: "Lily Tomlin",
    category: "kesuksesan"
  },
  {
    id: 24,
    text: "Kesuksesan bukanlah hasil kebetulan. Itu adalah kerja keras, ketekunan, belajar, dan pengorbanan.",
    author: "Pelé",
    category: "kesuksesan"
  },
  {
    id: 25,
    text: "Kesuksesan terbesar adalah bangkit setelah jatuh.",
    author: "Vince Lombardi",
    category: "kesuksesan"
  },

  // Kehidupan
  {
    id: 26,
    text: "Yang terbaik dari hidup adalah ketika kamu bisa berbagi kebahagiaan dengan orang lain.",
    author: "Audrey Hepburn",
    category: "kehidupan"
  },
  {
    id: 27,
    text: "Waktu yang kamu nikmati tidak pernah sia-sia.",
    author: "John Lennon",
    category: "kehidupan"
  },
  {
    id: 28,
    text: "Hidup adalah 10% apa yang terjadi padamu dan 90% bagaimana kamu meresponsnya.",
    author: "Charles R. Swindoll",
    category: "kehidupan"
  },
  {
    id: 29,
    text: "Hidup ini terlalu pendek untuk dihabiskan dengan menyesali masa lalu.",
    author: "Oscar Wilde",
    category: "kehidupan"
  },
  {
    id: 30,
    text: "Jangan hitung hari-hari, buatlah hari-hari berarti.",
    author: "Muhammad Ali",
    category: "kehidupan"
  },

  // Pendidikan
  {
    id: 31,
    text: "Pendidikan adalah senjata paling ampuh yang bisa kamu gunakan untuk mengubah dunia.",
    author: "Nelson Mandela",
    category: "pendidikan"
  },
  {
    id: 32,
    text: "Investasi dalam pengetahuan selalu memberikan bunga terbaik.",
    author: "Benjamin Franklin",
    category: "pendidikan"
  },
  {
    id: 33,
    text: "Belajarlah seolah kamu akan hidup selamanya. Hiduplah seolah kamu akan mati besok.",
    author: "Mahatma Gandhi",
    category: "pendidikan"
  },
  {
    id: 34,
    text: "Pendidikan bukanlah persiapan untuk hidup; pendidikan adalah hidup itu sendiri.",
    author: "John Dewey",
    category: "pendidikan"
  },
  {
    id: 35,
    text: "Semakin banyak kamu membaca, semakin banyak hal yang akan kamu ketahui.",
    author: "Dr. Seuss",
    category: "pendidikan"
  },

  // Kebahagiaan
  {
    id: 36,
    text: "Kebahagiaan bukan tujuan hidup, tetapi cara hidup.",
    author: "Burton Hills",
    category: "kebahagiaan"
  },
  {
    id: 37,
    text: "Kebahagiaan tidak bergantung pada apa yang kamu miliki, tapi pada apa yang kamu pikirkan tentang apa yang kamu miliki.",
    author: "Dale Carnegie",
    category: "kebahagiaan"
  },
  {
    id: 38,
    text: "Kebahagiaan sejati datang dari dalam diri, bukan dari luar.",
    author: "Buddha",
    category: "kebahagiaan"
  },
  {
    id: 39,
    text: "Tersenyumlah karena itu terjadi, jangan menangis karena itu berakhir.",
    author: "Dr. Seuss",
    category: "kebahagiaan"
  },
  {
    id: 40,
    text: "Kebahagiaan adalah ketika apa yang kamu pikirkan, katakan, dan lakukan dalam harmoni.",
    author: "Mahatma Gandhi",
    category: "kebahagiaan"
  },

  // Cinta
  {
    id: 41,
    text: "Cinta sejati tidak pernah berakhir. Kekasih mungkin pergi, tapi cinta tetap ada.",
    author: "William Shakespeare",
    category: "cinta"
  },
  {
    id: 42,
    text: "Cinta bukanlah tentang memiliki, tapi tentang memberikan.",
    author: "Mother Teresa",
    category: "cinta"
  },
  {
    id: 43,
    text: "Cinta adalah tindakan kehendak - yaitu, baik niat maupun tindakan.",
    author: "M. Scott Peck",
    category: "cinta"
  },
  {
    id: 44,
    text: "Cinta terbaik adalah jenis yang membangkitkan jiwa dan membuat kita ingin menjadi lebih baik.",
    author: "Nicholas Sparks",
    category: "cinta"
  },
  {
    id: 45,
    text: "Dicintai dalam-dalam oleh seseorang memberimu kekuatan, sementara mencintai seseorang dalam-dalam memberimu keberanian.",
    author: "Lao Tzu",
    category: "cinta"
  },

  // Teknologi
  {
    id: 46,
    text: "Teknologi hanyalah alat. Dalam hal membuat anak-anak bekerja sama dan memotivasi mereka, guru adalah yang terpenting.",
    author: "Bill Gates",
    category: "teknologi"
  },
  {
    id: 47,
    text: "Masa depan milik mereka yang mempersiapkan diri hari ini.",
    author: "Malcolm X",
    category: "teknologi"
  },
  {
    id: 48,
    text: "Inovasi membedakan antara pemimpin dan pengikut.",
    author: "Steve Jobs",
    category: "teknologi"
  },
  {
    id: 49,
    text: "Komputer tidak berguna. Mereka hanya bisa memberi jawaban.",
    author: "Pablo Picasso",
    category: "teknologi"
  },
  {
    id: 50,
    text: "Teknologi terbaik adalah yang tidak terlihat.",
    author: "Mark Weiser",
    category: "teknologi"
  },

  // Bisnis
  {
    id: 51,
    text: "Cara terbaik untuk memprediksi masa depan adalah dengan menciptakannya.",
    author: "Peter Drucker",
    category: "bisnis"
  },
  {
    id: 52,
    text: "Jangan takut gagal. Takutlah tidak mencoba.",
    author: "Michael Jordan",
    category: "bisnis"
  },
  {
    id: 53,
    text: "Kesempatan tidak datang dua kali.",
    author: "Maxime Lagacé",
    category: "bisnis"
  },
  {
    id: 54,
    text: "Pelanggan adalah aset terpenting dalam bisnis.",
    author: "Michael LeBoeuf",
    category: "bisnis"
  },
  {
    id: 55,
    text: "Ide tanpa eksekusi hanyalah halusinasi.",
    author: "Thomas Edison",
    category: "bisnis"
  },

  // Lebih banyak quotes motivasi dari tokoh dunia
  {
    id: 56,
    text: "Jika kamu ingin hidup bahagia, ikatlah hidupmu pada tujuan, bukan pada orang atau benda.",
    author: "Albert Einstein",
    category: "motivasi"
  },
  {
    id: 57,
    text: "Kegelapan tidak dapat mengusir kegelapan; hanya cahaya yang bisa melakukannya.",
    author: "Martin Luther King Jr.",
    category: "motivasi"
  },
  {
    id: 58,
    text: "Jangan biarkan apa yang tidak bisa kamu lakukan mengganggu apa yang bisa kamu lakukan.",
    author: "John Wooden",
    category: "motivasi"
  },
  {
    id: 59,
    text: "Percayalah pada dirimu sendiri dan semua yang ada dalam dirimu.",
    author: "Christian D. Larson",
    category: "motivasi"
  },
  {
    id: 60,
    text: "Bukan yang terkuat dari spesies yang bertahan hidup, tetapi yang paling responsif terhadap perubahan.",
    author: "Charles Darwin",
    category: "motivasi"
  },

  // Quotes dari tokoh Indonesia lainnya
  {
    id: 61,
    text: "Sekali merdeka, tetap merdeka!",
    author: "Soekarno",
    category: "nasionalisme"
  },
  {
    id: 62,
    text: "Bangsa yang besar adalah bangsa yang menghormati jasa para pahlawannya.",
    author: "Soekarno",
    category: "nasionalisme"
  },
  {
    id: 63,
    text: "Ilmu pengetahuan tanpa agama adalah pincang.",
    author: "B.J. Habibie",
    category: "pendidikan"
  },
  {
    id: 64,
    text: "Saya lebih suka menghadapi kesulitan hari ini daripada menyesal di hari esok.",
    author: "Mohammad Hatta",
    category: "motivasi"
  },
  {
    id: 65,
    text: "Kepribadian itu lebih penting daripada kepandaian.",
    author: "Mohammad Hatta",
    category: "kehidupan"
  },

  // Anime quotes - berbagai karakter
  {
    id: 66,
    text: "Ketika kamu memiliki tujuan yang jelas, kamu tidak akan tersesat di jalan yang gelap.",
    author: "Tanjiro Kamado",
    category: "motivasi"
  },
  {
    id: 67,
    text: "Plus Ultra! Selalu berusaha melebihi batas kemampuanmu!",
    author: "All Might",
    category: "motivasi"
  },
  {
    id: 68,
    text: "Mimpi tidak akan lari kemana-mana. Yang lari adalah diri kita sendiri.",
    author: "Hinata Shoyo",
    category: "motivasi"
  },
  {
    id: 69,
    text: "Kekuatan sejati bukan tentang tidak pernah jatuh, tapi tentang bangkit setiap kali kamu jatuh.",
    author: "Saitama",
    category: "motivasi"
  },
  {
    id: 70,
    text: "Yang membuat seseorang menjadi dewasa bukanlah umur, tapi pengalaman.",
    author: "Killua Zoldyck",
    category: "kehidupan"
  },

  // Quotes tentang persahabatan
  {
    id: 71,
    text: "Persahabatan adalah satu-satunya semen yang akan merekatkan dunia.",
    author: "Woodrow Wilson",
    category: "persahabatan"
  },
  {
    id: 72,
    text: "Teman sejati adalah seseorang yang masuk ketika seluruh dunia pergi keluar.",
    author: "Walter Winchell",
    category: "persahabatan"
  },
  {
    id: 73,
    text: "Persahabatan lahir pada saat ketika satu orang berkata kepada yang lain: Apa! Kamu juga? Saya pikir saya satu-satunya.",
    author: "C.S. Lewis",
    category: "persahabatan"
  },
  {
    id: 74,
    text: "Seorang teman adalah seseorang yang tahu lagu di hatimu dan bisa menyanyikannya kembali ketika kamu lupa liriknya.",
    author: "Albert Einstein",
    category: "persahabatan"
  },
  {
    id: 75,
    text: "Tidak ada yang lebih berbahaya daripada teman yang tidak tulus; lebih baik musuh yang bijaksana.",
    author: "Jean de La Fontaine",
    category: "persahabatan"
  },

  // Quotes tentang kerja keras
  {
    id: 76,
    text: "Kerja keras mengalahkan bakat ketika bakat tidak bekerja keras.",
    author: "Tim Notke",
    category: "kerja-keras"
  },
  {
    id: 77,
    text: "Tidak ada jalan pintas untuk tempat mana pun yang layak dituju.",
    author: "Beverly Sills",
    category: "kerja-keras"
  },
  {
    id: 78,
    text: "Keberuntungan adalah tempat bertemunya persiapan dengan kesempatan.",
    author: "Seneca",
    category: "kerja-keras"
  },
  {
    id: 79,
    text: "Semakin keras saya bekerja, semakin beruntung saya.",
    author: "Gary Player",
    category: "kerja-keras"
  },
  {
    id: 80,
    text: "Pekerjaan yang paling memuaskan di dunia adalah pekerjaan yang kamu lakukan dengan baik.",
    author: "David Sarnoff",
    category: "kerja-keras"
  },

  // Quotes tentang kepemimpinan
  {
    id: 81,
    text: "Pemimpin sejati tidak menciptakan pengikut, mereka menciptakan pemimpin lain.",
    author: "Tom Peters",
    category: "kepemimpinan"
  },
  {
    id: 82,
    text: "Cara terbaik untuk memimpin adalah dengan memberi contoh.",
    author: "Albert Schweitzer",
    category: "kepemimpinan"
  },
  {
    id: 83,
    text: "Kepemimpinan adalah tindakan, bukan posisi.",
    author: "Donald McGannon",
    category: "kepemimpinan"
  },
  {
    id: 84,
    text: "Seorang pemimpin adalah seseorang yang mengetahui jalan, menempuh jalan, dan menunjukkan jalan.",
    author: "John C. Maxwell",
    category: "kepemimpinan"
  },
  {
    id: 85,
    text: "Kepemimpinan bukan tentang menjadi yang terdepan. Ini tentang menjadikan orang lain lebih baik sebagai hasil dari kehadiranmu.",
    author: "Sheryl Sandberg",
    category: "kepemimpinan"
  },

  // Quotes tentang kreativitas
  {
    id: 86,
    text: "Kreativitas adalah kecerdasan yang sedang bersenang-senang.",
    author: "Albert Einstein",
    category: "kreativitas"
  },
  {
    id: 87,
    text: "Imajinasi lebih penting daripada pengetahuan.",
    author: "Albert Einstein",
    category: "kreativitas"
  },
  {
    id: 88,
    text: "Setiap anak adalah seniman. Masalahnya adalah bagaimana tetap menjadi seniman setelah dewasa.",
    author: "Pablo Picasso",
    category: "kreativitas"
  },
  {
    id: 89,
    text: "Kreativitas membutuhkan keberanian untuk melepaskan kepastian.",
    author: "Erich Fromm",
    category: "kreativitas"
  },
  {
    id: 90,
    text: "Ide yang bagus datang dari mana-mana jika kamu hanya mendengarkan.",
    author: "Jack Dorsey",
    category: "kreativitas"
  },

  // Quotes tentang pembelajaran
  {
    id: 91,
    text: "Belajar tanpa berpikir adalah sia-sia, berpikir tanpa belajar adalah berbahaya.",
    author: "Confucius",
    category: "pembelajaran"
  },
  {
    id: 92,
    text: "Satu-satunya sumber pengetahuan sejati adalah pengalaman.",
    author: "Albert Einstein",
    category: "pembelajaran"
  },
  {
    id: 93,
    text: "Pelajaran terbaik dalam hidup datang dari pengalaman terburuk.",
    author: "Andy Andrews",
    category: "pembelajaran"
  },
  {
    id: 94,
    text: "Belajarlah dari kesalahan orang lain. Kamu tidak bisa hidup cukup lama untuk membuat semuanya sendiri.",
    author: "Eleanor Roosevelt",
    category: "pembelajaran"
  },
  {
    id: 95,
    text: "Pengetahuan yang nyata adalah mengetahui luasnya ketidaktahuan seseorang.",
    author: "Confucius",
    category: "pembelajaran"
  },

  // Quotes tentang perubahan
  {
    id: 96,
    text: "Jadilah perubahan yang ingin kamu lihat di dunia.",
    author: "Mahatma Gandhi",
    category: "perubahan"
  },
  {
    id: 97,
    text: "Perubahan adalah hukum hidup. Dan mereka yang hanya melihat masa lalu atau sekarang pasti akan melewatkan masa depan.",
    author: "John F. Kennedy",
    category: "perubahan"
  },
  {
    id: 98,
    text: "Tidak ada yang permanen kecuali perubahan.",
    author: "Heraclitus",
    category: "perubahan"
  },
  {
    id: 99,
    text: "Kemajuan adalah hal yang mustahil tanpa perubahan, dan mereka yang tidak bisa mengubah pikiran mereka tidak bisa mengubah apa pun.",
    author: "George Bernard Shaw",
    category: "perubahan"
  },
  {
    id: 100,
    text: "Perubahan dimulai pada akhir zona nyamanmu.",
    author: "Roy T. Bennett",
    category: "perubahan"
  }
];