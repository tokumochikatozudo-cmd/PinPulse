# PinPulse - Platform Laporan Komunitas Cerdas

## 🚀 Overview

PinPulse adalah platform web modern untuk pelaporan komunitas yang cerdas dan interaktif. Aplikasi ini memungkinkan warga untuk melaporkan berbagai masalah, ide, atau keadaan darurat dalam lingkungan mereka melalui peta interaktif yang menarik.

## ✨ Fitur Utama

### 🗺️ Sistem Peta Canggih
- **Leaflet Maps** - Peta utama dengan performa tinggi dan kustomisasi lengkap
- **Multiple Tile Layers** - Pilihan gaya peta: Jalan, Satelit, Gelap, Terang, Terrain
- **Custom Markers** - Marker unik berdasarkan jenis laporan
- **Clustering** - Pengelompokan marker untuk performa optimal
- **Real-time Location** - Fitur lokasi pengguna dengan GPS

### 📊 Dashboard Interaktif
- **Statistik Real-time** - Total laporan, darurat, perlu perhatian, ide positif
- **Animasi Counter** - Efek visual menarik untuk pembaruan data
- **Achievement System** - Sistem penghargaan untuk pengguna aktif
- **Community Score** - Skor komunitas yang meningkat dengan partisipasi

### 📝 Sistem Laporan
- **Multiple Report Types** - Darurat, Perlu Perhatian, Ide Positif
- **Priority Levels** - Rendah, Sedang, Tinggi, Darurat
- **Rich Popups** - Informasi lengkap dengan upvote dan aksi
- **Form Submission** - Form laporan dengan validasi

### 🎨 Desain Modern
- **Glass Morphism UI** - Efek kaca transparan yang elegan
- **Gradient Backgrounds** - Latar belakang gradien dinamis
- **Smooth Animations** - Transisi halus dengan Anime.js
- **Responsive Design** - Optimal untuk semua perangkat
- **Dark Mode Support** - Mode gelap otomatis

### 🎯 Interaktivitas
- **Click to Report** - Klik langsung di peta untuk melaporkan
- **Upvote System** - Dukung laporan yang relevan
- **Focus Feature** - Fokus pada laporan tertentu
- **Surprise Button** - Efek kejutan dan bonus poin

## 🛠️ Teknologi yang Digunakan

### Frontend
- **HTML5** - Struktur semantik modern
- **CSS3** - Styling canggih dengan custom properties
- **JavaScript ES6+** - Kode modern dan modular
- **Tailwind CSS** - Utility-first CSS framework

### Libraries
- **Leaflet.js** - Peta interaktif open-source
- **Anime.js** - Animasi JavaScript yang ringan
- **Splide.js** - Carousel/slider (siap digunakan)
- **Inter Font** - Font modern dari Google Fonts

### Features
- **Web APIs** - Geolocation, Local Storage, Notification
- **Responsive Design** - Mobile-first approach
- **Progressive Enhancement** - Fungsionalitas di semua browser
- **Accessibility** - Dukungan untuk pengguna dengan kebutuhan khusus

## 📁 Struktur File

```
PinPulse/
├── index.html              # Halaman utama aplikasi
├── styles.css              # Styling kustom dan animasi
├── script.js               # Logika aplikasi utama
├── config.js               # Konfigurasi aplikasi
├── README.md               # Dokumentasi ini
└── resources/              # Aset tambahan (jika ada)
```

## 🚀 Cara Menggunakan

### 1. Clone atau Download
```bash
# Clone repository (jika tersedia)
git clone https://github.com/yourusername/pinpulse.git

# Atau download dan ekstrak file
```

### 2. Jalankan Aplikasi

#### Opsi 1: Server Lokal Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Opsi 2: Server Lokal Node.js
```bash
# Install http-server globally
npm install -g http-server

# Jalankan server
http-server -p 8000
```

#### Opsi 3: Live Server (VS Code)
- Install ekstensi "Live Server" di VS Code
- Klik kanan pada `index.html`
- Pilih "Open with Live Server"

### 3. Akses Aplikasi
Buka browser dan akses:
```
http://localhost:8000
```

## 🎯 Cara Menggunakan Aplikasi

### Menambahkan Laporan
1. **Klik di Peta** - Klik lokasi di mana Anda ingin melaporkan
2. **Isi Form** - Pilih jenis laporan, judul, deskripsi, dan prioritas
3. **Kirim** - Klik "Kirim Laporan" untuk mengirim

### Melihat Laporan
- **Klik Marker** - Klik marker di peta untuk melihat detail
- **Popup Info** - Lihat informasi lengkap dengan upvote dan aksi
- **Fokus Laporan** - Klik "Fokus" untuk melihat laporan lebih dekat

### Interaksi Lainnya
- **Lokasi Saya** - Klik tombol "📍 Lokasi Saya" untuk menemukan posisi Anda
- **Upvote** - Dukung laporan dengan mengklik "👍 Dukung"
- **Kejutan** - Klik tombol "🎉 Kejutan!" untuk bonus poin

## ⚙️ Konfigurasi

### Peta
Aplikasi menggunakan Leaflet.js sebagai peta utama dengan beberapa opsi:
- **OpenStreetMap** - Peta jalan standar
- **Satellite** - Peta satelit dari Esri
- **Dark/Light** - Tema gelap dan terang dari Carto
- **Terrain** - Peta topografi dari OpenTopoMap

### Gaya Peta
Pilih gaya peta dari dropdown di pojok kanan atas:
- **Jalan** - Tampilan jalan standar
- **Satelit** - Tampilan satelit
- **Gelap** - Tema gelap untuk penggunaan malam
- **Terang** - Tema terang yang bersih

## 🎨 Kustomisasi

### Warna Tema
Edit variabel CSS di `styles.css`:
```css
:root {
    --primary-blue: #3b82f6;
    --primary-purple: #8b5cf6;
    --success-green: #10b981;
    /* ... */
}
```

### Marker Kustom
Ubah fungsi `getMarkerIcon()` di `script.js` untuk marker kustom

### Lokasi Default
Ubah koordinat default di `config.js`:
```javascript
leaflet: {
    defaultCenter: [-6.2088, 106.8456], // Koordinat Jakarta
    defaultZoom: 12
}
```

## 🌐 Browser Support

### Browser yang Didukung
- **Chrome** 80+ ✅
- **Firefox** 75+ ✅
- **Safari** 13+ ✅
- **Edge** 80+ ✅
- **Opera** 67+ ✅

### Fitur yang Memerlukan Browser Modern
- **Geolocation API** - Untuk fitur lokasi pengguna
- **Local Storage** - Untuk menyimpan data pengguna
- **CSS Grid & Flexbox** - Untuk tata letak responsif
- **ES6+ JavaScript** - Untuk kode modern

## 📱 Responsivitas

Aplikasi ini sepenuhnya responsif dan mendukung:
- **Desktop** - Pengalaman penuh dengan semua fitur
- **Tablet** - Tata letak yang dioptimalkan untuk layar sentuh
- **Mobile** - Desain mobile-first dengan navigasi mudah

## ♿ Aksesibilitas

### Fitur Aksesibilitas
- **Keyboard Navigation** - Navigasi penuh dengan keyboard
- **Screen Reader Support** - Label dan deskripsi yang tepat
- **High Contrast Mode** - Dukungan untuk mode kontras tinggi
- **Reduced Motion** - Menghormati preferensi pengurangan animasi
- **Focus Indicators** - Indikator fokus yang jelas

### Shortcut Keyboard
- **Tab** - Navigasi antar elemen
- **Enter** - Aktifkan tombol atau tautan
- **Escape** - Tutup modal atau popup

## 🔧 Troubleshooting

### Masalah Umum

#### Peta Tidak Muncul
- **Cek Koneksi Internet** - Peta memerlukan koneksi untuk memuat tile
- **Clear Cache** - Bersihkan cache browser dan coba lagi
- **Cek Console** - Lihat pesan error di developer console

#### Geolocation Tidak Berfungsi
- **HTTPS Required** - Geolocation hanya berfungsi di HTTPS
- **Izin Lokasi** - Pastikan izin lokasi diaktifkan di browser
- **GPS/Location Services** - Aktifkan layanan lokasi di perangkat

#### Animasi Tidak Berfungsi
- **Reduced Motion** - Cek pengaturan reduced motion di OS
- **Browser Support** - Pastikan browser mendukung Anime.js
- **JavaScript Enabled** - Pastikan JavaScript diaktifkan

### Dukungan Browser Lama
Untuk browser yang tidak mendukung fitur modern:
- Peta akan tetap berfungsi tanpa animasi
- Form laporan tetap dapat digunakan
- Statistik akan ditampilkan tanpa efek visual

## 🤝 Kontribusi

Kami menyambut kontribusi! Cara berkontribusi:

1. **Fork Repository** - Buat fork dari proyek ini
2. **Feature Branch** - Buat branch untuk fitur baru
3. **Commit Changes** - Lakukan perubahan dengan commit yang jelas
4. **Push Branch** - Push branch ke repository Anda
5. **Pull Request** - Buat pull request dengan deskripsi yang jelas

### Area Kontribusi
- **UI/UX Improvements** - Perbaikan tampilan dan pengalaman
- **New Features** - Fitur baru yang berguna
- **Bug Fixes** - Perbaikan bug yang ada
- **Documentation** - Perbaikan dokumentasi
- **Translations** - Terjemahan ke bahasa lain

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License**:

```
MIT License

Copyright (c) 2024 PinPulse Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

### Libraries & Frameworks
- **Leaflet.js** - Peta interaktif open-source
- **Anime.js** - Animasi JavaScript ringan
- **Tailwind CSS** - Framework CSS utility-first
- **Inter Font** - Font modern dari Google Fonts

### Data & APIs
- **OpenStreetMap** - Data peta open-source
- **Carto** - Tile layer tema gelap/terang
- **Esri** - Tile layer satelit

### Inspirasi
- **Modern Web Design** - Prinsip desain web modern
- **User Experience** - Fokus pada pengalaman pengguna
- **Community Engagement** - Partisipasi komunitas

## 📞 Kontak

Untuk pertanyaan, saran, atau bantuan:

- **Email**: support@pinpulse.example.com
- **Website**: https://pinpulse.example.com
- **Issues**: https://github.com/yourusername/pinpulse/issues

## 🔄 Changelog

### v2.0.0 (Current)
- ✅ Leaflet Maps sebagai pengganti Google Maps
- ✅ Multiple tile layer options
- ✅ Enhanced UI dengan glass morphism
- ✅ Achievement system
- ✅ Real-time statistics
- ✅ Responsive design
- ✅ Accessibility improvements

### v1.0.0 (Previous)
- ✅ Basic map functionality
- ✅ Report submission
- ✅ Simple statistics

---

**PinPulse** - Membuat komunitas lebih baik bersama! 🚀

*Platform Laporan Komunitas Cerdas - Modern, Interaktif, dan Responsif*