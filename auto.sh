#!/bin/bash

echo "🔄 Memulai sinkronisasi otomatis ke GitHub..."

# 1. Daftarkan semua perubahan kode terbaru
git add .

# 2. Commit otomatis dengan pesan waktu saat ini
waktu=$(date "+%Y-%m-%d %H:%M:%S")
git commit -m "Auto-update: $waktu"

# 3. Push otomatis ke GitHub
git push origin main

echo "✔ Selesai! Kode terbaru sudah diterbangkan ke GitHub dan robot DevOps sedang memperbarui webmu."
