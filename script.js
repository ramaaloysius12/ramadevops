// Starfield & Shooting Stars Real-time Simulation Engine
const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');

let stars = [];
let shootingStars = [];
const maxStars = 140;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Inisialisasi Kumpulan Objek Bintang Statis Bercahaya
class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.8;
        this.alpha = Math.random();
        this.speed = 0.01 + Math.random() * 0.02;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = this.size * 4;
        ctx.shadowColor = '#38bdf8';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    update() {
        this.alpha += this.speed;
        if (this.alpha > 1 || this.alpha < 0) {
            this.speed = -this.speed;
        }
    }
}

// Inisialisasi Objek Bintang Jatuh Spasial 3D
class ShootingStar {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * (canvas.height / 2);
        this.len = 10 + Math.random() * 30;
        this.speedX = 4 + Math.random() * 7;
        this.speedY = 2 + Math.random() * 4;
        this.alpha = 1;
        this.scale = 0.5 + Math.random() * 0.5;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2 * this.scale;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#a855f7';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.len * 1.5, this.y - this.len);
        ctx.stroke();
        ctx.restore();
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.015;
        if (this.alpha <= 0 || this.x > canvas.width || this.y > canvas.height) {
            this.reset();
        }
    }
}

for (let i = 0; i < maxStars; i++) {
    stars.push(new Star());
}
// 3 Bintang jatuh simultan berkelanjutan
for (let i = 0; i < 3; i++) {
    shootingStars.push(new ShootingStar());
}

function animateEngine() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    
    shootingStars.forEach(sStar => {
        sStar.update();
        sStar.draw();
    });
    
    requestAnimationFrame(animateEngine);
}
animateEngine();

// Hamburger Mobile Navigation Menu Controller
const hamburger = document.getElementById('hamburgerMenu');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if(navLinks.classList.contains('active')) {
        icon.className = 'fas fa-times';
        hamburger.style.transform = 'rotate(90deg)';
    } else {
        icon.className = 'fas fa-bars';
        hamburger.style.transform = 'rotate(0deg)';
    }
});
// ==================================================
// TAMBAHAN JS: LOGIK INTEGRASI WHATSAPP API AUTO BOT
// ==================================================

// 1. Konfigurasi Nomor & Pesan Otomatis (Ubah nomor di bawah sesuai nomor WA Anda)
function redirectToWhatsApp() {
    const nomorWhatsApp = "6281234567890"; // Ganti dengan nomor Anda (gunakan kode negara 62 tanpa tanda +)
    const teksPesan = "Halo Rama, saya tertarik dengan portofolio 3D Anda dan ingin mendiskusikan penawaran projek kolaborasi.";
    
    // Enkode teks agar aman dalam URL browser
    const urlAPI = `https://api.whatsapp.com/send?phone=${nomorWhatsApp}&text=${encodeURIComponent(teksPesan)}`;
    
    // Eksekusi pengalihan link ke aplikasi WA resmi
    window.open(urlAPI, '_blank');
}

// 2. Memunculkan Balon Dialog Penyambutan Otomatis (Delay 3 Detik setelah load)
window.addEventListener('DOMContentLoaded', () => {
    const popover = document.getElementById('chatPopover');
    if (popover) {
        setTimeout(() => {
            popover.classList.add('show');
        }, 3000); // 3000 milidetik = 3 detik
    }
});
// ==================================================
// INTEGRASI FORM KONTAK LANGSUNG KE WHATSAPP
// ==================================================
function kirimPesanKeWA() {
    const nama = document.getElementById('contactNama').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const pesan = document.getElementById('contactPesan').value.trim();
    
    // ⚠️ GANTI DENGAN NOMOR WHATSAPP ANDA (Gunakan kode negara 62, jangan pakai angka 0 atau +)
    const nomorWA = "6281234567890"; 

    // Menyusun format teks agar rapi saat masuk ke obrolan WhatsApp
    const teksPesan = `Halo Rama, ada pesan masuk dari Form Portofolio:\n\n` +
                      `👤 *Nama:* ${nama}\n` +
                      `📧 *Email:* ${email}\n` +
                      `📝 *Pesan:* ${pesan}`;

    // Enkode teks pesan agar aman masuk ke dalam struktur URL browser
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${6281297606784}&text=${encodeURIComponent(teksPesan)}`;

    // Buka aplikasi WhatsApp di tab baru
    window.open(urlWhatsApp, '_blank');
}
const words = ["Web Developer", "Digital Marketer", "Linux Enthusiast"];
let i = 0;
let timer;

function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            document.querySelector('.typing-text').innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000);
            return false;
        }
        timer = setTimeout(loopTyping, 100);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            document.querySelector('.typing-text').innerHTML = word.join("");
        } else {
            if (words.length > (i + 1)) { i++; } else { i = 0; }
            setTimeout(typingEffect, 500);
            return false;
        }
        timer = setTimeout(loopDeleting, 60);
    };
    loopDeleting();
}

// Jalankan saat halaman siap
document.addEventListener("DOMContentLoaded", typingEffect);


// ==================================================
// LOGIKA GENERATOR IKON ANIMASI 3D LINUX ORBIT
// ==================================================
const orbitStage = document.getElementById('linuxOrbitStage');

// Daftar ikon FontAwesome khusus ekosistem Linux & Core Dev
const linuxOrbitIcons = [
    { class: 'fab fa-linux', color: '#facc15' },      // Tux
    { class: 'fas fa-terminal', color: '#22c55e' },   // Terminal
    { class: 'fab fa-docker', color: '#0db7ed' },     // Docker
    { class: 'fas fa-server', color: '#38bdf8' },     // Server Box
    { class: 'fas fa-code-branch', color: '#f43f5e' },// Git / Repositori
    { class: 'fas fa-database', color: '#a855f7' },   // Database
    { class: 'fas fa-network-wired', color: '#fb923c' }// Network
];

function spawnOrbitIcon() {
    if (!orbitStage) return;

    const currentIcon = linuxOrbitIcons[Math.floor(Math.random() * linuxOrbitIcons.length)];
    const iconElement = document.createElement('i');
    
    iconElement.className = `orbit-particle ${currentIcon.class}`;
    iconElement.style.color = currentIcon.color;
    
    // Posisi acak kiri-kanan (rentang aman 10% sampai 85%)
    const posX = Math.floor(Math.random() * 75) + 10;
    iconElement.style.left = `${posX}%`;
    
    // Ukuran acak untuk efek kedalaman ruang 3D (Z-Index tiruan)
    const sizeScale = (Math.random() * 0.5 + 0.9).toFixed(2);
    iconElement.style.fontSize = `${sizeScale}rem`;
    
    // Variasi durasi gerak naik (antara 3.0s sampai 4.5s)
    const speedDuration = (Math.random() * 1.5 + 3.0).toFixed(1);
    iconElement.style.animationDuration = `${speedDuration}s`;
    
    // Masukkan ikon ke dalam panggung
    orbitStage.appendChild(iconElement);
    
    // Hapus dari memori DOM ketika animasi selesai agar performa HP Rama lancar
    setTimeout(() => {
        iconElement.remove();
    }, speedDuration * 1000);
}

// Jalankan otomatis: Ikon baru lahir setiap 900 milidetik
if (orbitStage) {
    setInterval(spawnOrbitIcon, 900);
}

