# 1. Gunakan base image Python resmi yang ringan
FROM python:3.9-slim

# 2. Atur environment variable agar Python tidak menulis file .pyc ke disk
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# 3. Atur folder kerja di dalam container
WORKDIR /app

# 4. Install dependensi sistem yang dibutuhkan (jika ada)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# 5. Salin requirements.txt dan install library Python
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# 6. Salin seluruh kode proyek ke dalam container
COPY . /app/

# 7. Jalankan migrasi database dan pastikan port 8000 terbuka
EXPOSE 8000

# 8. Perintah untuk menjalankan server Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
