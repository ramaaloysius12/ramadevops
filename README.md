# Portfolio Muhammad Syafiq - Panduan Setup

## Struktur Folder
```
portofolio-syafiq/
├── index.html          ← File utama (buka ini di browser)
├── css/
│   └── style.css       ← Styling
├── js/
│   └── main.js         ← Interaksi & animasi
├── images/
│   └── README.txt      ← Panduan folder gambar
├── pdf/
│   └── README.txt      ← Panduan folder CV
└── README.md           ← Panduan ini
```

---

## Langkah Setup

### 1. Tambahkan Foto Profil
- Letakkan foto kamu ke folder `images/`
- Beri nama file: `profile.jpg` (atau `profile.png`)
- Ukuran disarankan: 400x400 px (persegi)

### 2. Tambahkan CV (PDF)
- Letakkan file CV ke folder `pdf/`
- Beri nama file: `cv-syafiq.pdf`
- CV akan otomatis tampil di halaman utama

### 3. Atur Nomor WhatsApp
- Buka `index.html`
- Di bagian form kontak, user isi langsung nomor WA di kolom yang tersedia
- Atau ubah placeholder di baris `<input ... id="waInput">`

### 4. Tambah Keahlian
- Di halaman bagian Skills, scroll ke bawah
- Isi nama keahlian & level (1-100) lalu klik Tambah
- Data tersimpan otomatis di browser (localStorage)

### 5. Ubah Informasi Pribadi
Buka `index.html` dan cari teks berikut untuk diubah:
- `syafiq@email.com` → email asli kamu
- `syafiq.dev` → website asli kamu
- `+62 812-XXXX-XXXX` → nomor HP asli kamu
- Bagian tabel HRD (Pendidikan, Lokasi, dll.)

---

## Cara Buka
1. Klik 2x `index.html` (buka di browser)
2. ATAU gunakan Live Server di VS Code
3. ATAU upload ke hosting (cPanel, Netlify, dll.)

---

## Fitur
- Background 3D animasi partikel interaktif
- Blob gradient visual
- Custom cursor
- Foto profil dengan ring animasi
- Skill bar (Web Dev, SEO, Digital Marketing)
- Tambah keahlian kustom manual
- Penampil CV inline (iframe PDF)
- Tombol download CV
- Form kontak integrasi WhatsApp otomatis
- Spesifikasi HRD profesional
- Responsive mobile
- Scroll reveal animation
- Loader screen
