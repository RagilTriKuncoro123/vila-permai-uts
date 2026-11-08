# Vila Permai

Website pemesanan vila berbasis web untuk studi kasus UTS. Proyek ini dibuat dengan HTML, CSS, dan JavaScript murni untuk menampilkan halaman promosi, form reservasi, dan fitur perhitungan total biaya secara otomatis.

## Struktur file

- `index.html` – struktur halaman utama
- `style.css` – desain responsif dan layout tampilan
- `script.js` – validasi form dan kalkulasi total pemesanan
- `.gitignore` – file yang tidak perlu diikutsertakan saat commit

## Cara menjalankan

1. Buka file `index.html` di browser, atau
2. Jalankan server lokal dari folder proyek:
   ```bash
   python -m http.server 8000
   ```
3. Akses halaman melalui `http://localhost:8000`

## Fitur utama

- Halaman landing page untuk Vila Permai
- Form pemesanan lengkap dengan nama, tanggal, jumlah tamu, dan pilihan vila
- Validasi input dengan pesan kesalahan dalam bahasa Indonesia
- Perhitungan otomatis total biaya berdasarkan harga per malam, jumlah malam, dan jumlah kamar
- Desain responsif untuk perangkat mobile dan desktop

## Catatan

Proyek ini dibuat sebagai tugas UTS dan siap diunggah ke GitHub untuk proses version control.
