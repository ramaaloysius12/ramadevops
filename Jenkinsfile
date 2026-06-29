pipeline {
    agent any

    environment {
        // Ganti dengan username Docker Hub kamu
        DOCKER_HUB_USER = 'ramahaxor'
        IMAGE_NAME      = 'ramadevops-django'
        IMAGE_TAG       = "${env.BUILD_NUMBER}"
        // ID Credentials yang disimpan di Jenkins untuk login Docker Hub
        DOCKER_CRED_ID  = 'docker-hub-credentials' 
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo '📥 Menarik kode terbaru dari GitHub...'
                // Menarik kode terbaru dari GitHub repositori kamu
                git branch: 'main', url: 'https://github.com/ramaaloysius12/ramadevops.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🛠️ Memulai Build Docker Image...'
                // Membangun image dengan tag nomor build Jenkins dan tag 'latest'
                sh "docker build -t ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG} ."
                sh "docker build -t ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo '🚀 Memulai Push ke Docker Hub...'
                // Menggunakan secure credentials Jenkins untuk melakukan login dan push otomatis
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CRED_ID}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin"
                    sh "docker push ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
                    sh "docker push ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Clean Up') {
            steps {
                echo '🧹 Membersihkan Image Lokal di Server Jenkins...'
                // Menghapus image lokal agar penyimpanan server tidak penuh
                sh "docker rmi ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG} || true"
                sh "docker rmi ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest || true"
            }
        }
    }

    post {
        success {
            echo '✅ Selesai! Aplikasi Django kamu sukses di-build dan di-push ke Docker Hub.'
        }
        failure {
            echo '❌ Pipeline Gagal. Silakan periksa log eror di atas.'
        }
    }
}
