pipeline {
    agent any

    options {
        // Otomatis menghapus build lama, hanya menyisakan 5 riwayat terakhir
        buildDiscarder(logRotator(numToKeepStr: '5'))
        // Membatasi agar tidak ada dua proses deploy yang berjalan bersamaan (menghindari crash)
        disableConcurrentBuilds()
    }

    stages {
        stage('1. Ambil Kode (Checkout)') {
            steps {
                // Mendownload kode terbaru yang dikirim dari GitHub
                checkout scm
                echo "=== TAHAP 1: Sukses mengambil kode terbaru dari GitHub ==="
            }
        }

        stage('2. Uji Kelayakan (Validate)') {
            steps {
                // Memeriksa apakah file html dan css pentingnya ada atau tidak sebelum dideploy
                sh '''
                    echo "Memeriksa kelengkapan file..."
                    if [ ! -f index.html ] || [ ! -f style.css ]; then
                        echo "ERROR: File index.html atau style.css hilang!"
                        exit 1
                    fi
                    echo "=== TAHAP 2: File divalidasi dan aman untuk dideploy ==="
                '''
            }
        }

        stage('3. Terbitkan ke Web (Deploy)') {
            steps {
                // Menyalin file ke folder web server publik (Apache/Nginx) di server kamu
                echo "Memulai transfer file ke web server publik..."
                sh 'sudo cp index.html style.css /var/www/html/'
                echo "=== TAHAP 3: Web Portofolio Rama Berhasil Online! ==="
            }
        }
    }

    post {
        success {
            echo "========== [STATUS SUCCESS] PIPELINE BERJALAN SEMPURNA =========="
        }
        failure {
            echo "========== [STATUS FAILED] PIPELINE GAGAL, PERIKSA KEMBALI KODE =========="
        }
    }
}
