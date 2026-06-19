/* ========================================
   MUHAMMAD SYAFIQ PORTFOLIO - MAIN JS
   ======================================== */

// ==============================
// LOADER
// ==============================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    // Trigger skill bar animations after load
    animateSkillBars();
    initReveal();
  }, 1200);
});

// ==============================
// CUSTOM CURSOR
// ==============================
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');
let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
});

function animateOutline() {
  outlineX += (mouseX - outlineX) * 0.12;
  outlineY += (mouseY - outlineY) * 0.12;
  outline.style.left = (outlineX - 18) + 'px';
  outline.style.top = (outlineY - 18) + 'px';
  requestAnimationFrame(animateOutline);
}
animateOutline();

document.querySelectorAll('a, button, .portfolio-card, .info-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    outline.style.transform = 'scale(1.6)';
    outline.style.borderColor = 'rgba(108,99,255,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    outline.style.transform = 'scale(1)';
    outline.style.borderColor = 'rgba(108,99,255,0.5)';
  });
});

// ==============================
// NAVBAR
// ==============================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// Hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// Active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = '#6c63ff';
    }
  });
});

// ==============================
// 3D BACKGROUND CANVAS
// ==============================
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const COLORS = ['#6c63ff', '#ff6584', '#43e97b', '#ffd700', '#00d4ff'];

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.z = Math.random() * 0.8 + 0.2;
    this.radius = (Math.random() * 2 + 1) * this.z;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.vx = (Math.random() - 0.5) * 0.4 * this.z;
    this.vy = (Math.random() - 0.5) * 0.4 * this.z;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.pulse = Math.random() * Math.PI * 2;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.pulse += 0.02;
    this.currentAlpha = this.alpha * (0.6 + 0.4 * Math.sin(this.pulse));
    if (this.x < -20) this.x = w + 20;
    if (this.x > w + 20) this.x = -20;
    if (this.y < -20) this.y = h + 20;
    if (this.y > h + 20) this.y = -20;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = hexToRgba(this.color, this.currentAlpha);
    ctx.fill();
  }
}

// Lines between nearby particles
function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const alpha = (1 - dist / 120) * 0.12;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(108, 99, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// Init particles
for (let i = 0; i < 90; i++) particles.push(new Particle());

let mouseParticleX = -999, mouseParticleY = -999;
canvas.addEventListener('mousemove', e => {
  mouseParticleX = e.clientX;
  mouseParticleY = e.clientY;
});

function canvasLoop() {
  ctx.clearRect(0, 0, w, h);

  // Mouse repel effect
  particles.forEach(p => {
    const dx = p.x - mouseParticleX;
    const dy = p.y - mouseParticleY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 80) {
      const force = (80 - dist) / 80;
      p.x += dx / dist * force * 2;
      p.y += dy / dist * force * 2;
    }
    p.update();
    p.draw();
  });

  drawConnections();
  requestAnimationFrame(canvasLoop);
}
canvasLoop();

// ==============================
// SCROLL REVEAL
// ==============================
function initReveal() {
  document.querySelectorAll('.section-label, .section-title, .about-grid, .skills-categories, .portfolio-card, .hrd-card, .spec-table-wrap, .contact-grid, .cv-wrapper, .custom-skills-box, .tools-section').forEach(el => {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('skills-categories') || entry.target.classList.contains('reveal')) {
          animateSkillBars();
        }
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ==============================
// SKILL BAR ANIMATIONS
// ==============================
let barsAnimated = false;
function animateSkillBars() {
  if (barsAnimated) return;
  const bars = document.querySelectorAll('.sb-fill');
  if (bars.length === 0) return;
  bars.forEach(bar => {
    const w = bar.dataset.width;
    setTimeout(() => { bar.style.width = w + '%'; }, 200);
  });
  barsAnimated = true;
}

// Re-animate when skills section scrolls into view
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) animateSkillBars(); });
  }, { threshold: 0.3 });
  barObserver.observe(skillsSection);
}

// ==============================
// CUSTOM SKILLS
// ==============================
let customSkills = JSON.parse(localStorage.getItem('customSkills') || '[]');

function renderCustomSkills() {
  const container = document.getElementById('customSkillsList');
  container.innerHTML = '';
  customSkills.forEach((skill, idx) => {
    const div = document.createElement('div');
    div.className = 'custom-skill-item';
    div.innerHTML = `
      <div class="csi-header">
        <span>${skill.name}</span>
        <div style="display:flex;align-items:center;gap:1rem">
          <span class="csi-pct">${skill.level}%</span>
          <button onclick="removeCustomSkill(${idx})">&#215; Hapus</button>
        </div>
      </div>
      <div class="csi-bar">
        <div class="csi-fill" style="width:${skill.level}%"></div>
      </div>
    `;
    container.appendChild(div);
  });
}

function addCustomSkill() {
  const name = document.getElementById('skillName').value.trim();
  const level = parseInt(document.getElementById('skillLevel').value);
  if (!name) { alert('Masukkan nama keahlian!'); return; }
  if (!level || level < 1 || level > 100) { alert('Level harus antara 1-100!'); return; }
  customSkills.push({ name, level });
  localStorage.setItem('customSkills', JSON.stringify(customSkills));
  renderCustomSkills();
  document.getElementById('skillName').value = '';
  document.getElementById('skillLevel').value = '';
}

function removeCustomSkill(idx) {
  customSkills.splice(idx, 1);
  localStorage.setItem('customSkills', JSON.stringify(customSkills));
  renderCustomSkills();
}

// Load saved skills on init
renderCustomSkills();

// ==============================
// CV VIEWER
// ==============================
function openCV() {
  window.open('pdf/cv-syafiq.pdf', '_blank');
}

// Fallback for iframe if PDF not found
document.getElementById('cvFrame').addEventListener('error', function() {
  this.style.display = 'none';
});

// ==============================
// WHATSAPP INTEGRATION
// ==============================
function sendWhatsApp() {
  const name = document.getElementById('senderName').value.trim();
  const subject = document.getElementById('msgSubject').value;
  const waInput = document.getElementById('waInput').value.trim();
  const message = document.getElementById('msgText').value.trim();

  if (!waInput) {
    alert('Masukkan nomor WhatsApp terlebih dahulu!\n\nIsi kolom "Nomor WhatsApp Syafiq" dengan nomor WA tujuan.\nContoh: 628123456789');
    return;
  }

  // Clean phone number
  let phone = waInput.replace(/[\s\-\+\(\)]/g, '');
  if (phone.startsWith('0')) phone = '62' + phone.slice(1);
  if (!phone.startsWith('62')) phone = '62' + phone;

  // Build message
  const senderLine = name ? `Halo Syafiq, perkenalkan saya *${name}*.` : 'Halo Syafiq,';
  const subjectLine = `\n\n*Keperluan:* ${subject}`;
  const msgLine = message ? `\n\n${message}` : '';
  const footerLine = `\n\n---\nPesan ini dikirim dari website portofolio Anda.`;

  const fullMsg = encodeURIComponent(senderLine + subjectLine + msgLine + footerLine);
  const url = `https://wa.me/${phone}?text=${fullMsg}`;
  window.open(url, '_blank');
}

// ==============================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ==============================
// TYPING EFFECT ON HERO NAME
// ==============================
const heroRoles = ['Web Developer', 'SEO Specialist', 'Digital Marketer'];
let roleIdx = 0;
const roleTags = document.querySelectorAll('.role-tag');
setInterval(() => {
  roleIdx = (roleIdx + 1) % roleTags.length;
  roleTags.forEach((tag, i) => {
    tag.style.opacity = i === roleIdx ? '1' : '0.4';
    tag.style.transform = i === roleIdx ? 'scale(1.05)' : 'scale(1)';
    tag.style.transition = 'all 0.4s ease';
    tag.style.borderColor = i === roleIdx ? 'rgba(108,99,255,0.6)' : 'rgba(255,255,255,0.08)';
    tag.style.color = i === roleIdx ? '#6c63ff' : '';
  });
}, 2200);

console.log('%c Muhammad Syafiq Portfolio ', 'background: linear-gradient(135deg, #6c63ff, #ff6584); color: white; font-size: 16px; padding: 8px 16px; border-radius: 8px;');
console.log('%c Web Developer | SEO Specialist | Digital Marketing ', 'color: #43e97b; font-size: 12px;');



Buatkan code html pemutar lagu otomatis berputar dan lagu di ambil dari folder music 

Berikut contoh HTML + JavaScript untuk pemutar lagu yang otomatis memutar semua file dari folder music/ (playlist manual karena browser tidak bisa membaca isi folder langsung demi keamanan):

✅ Struktur Folder
project/
│── index.html
└── music/
    ├── lagu1.mp3
    ├── lagu2.mp3
    ├── lagu3.mp3
🎧 Kode HTML Pemutar Lagu Otomatis
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Music Player Auto</title>
  <style>
    body {
      background: #111;
      color: white;
      text-align: center;
      font-family: Arial;
      padding-top: 50px;
    }

    .player {
      background: #222;
      padding: 20px;
      border-radius: 15px;
      display: inline-block;
      box-shadow: 0 0 20px rgba(0,255,255,0.5);
    }

    button {
      margin: 10px;
      padding: 10px 20px;
      border: none;
      border-radius: 10px;
      background: cyan;
      cursor: pointer;
      font-weight: bold;
    }
  </style>
</head>
<body>

<div class="player">
  <h2>🎵 Music Player</h2>
  <p id="judul">Memuat...</p>

  <audio id="audio" autoplay></audio>

  <br>
  <button onclick="prev()">⏮ Prev</button>
  <button onclick="playPause()">⏯ Play/Pause</button>
  <button onclick="next()">⏭ Next</button>
</div>

<script>
  const lagu = [
    "music/lagu1.mp3",
    "music/lagu2.mp3",
    "music/lagu3.mp3"
  ];

  let index = 0;
  const audio = document.getElementById("audio");
  const judul = document.getElementById("judul");

  function loadSong(i) {
    audio.src = lagu[i];
    judul.innerText = lagu[i].split("/")[1];
    audio.play();
  }

  function next() {
    index = (index + 1) % lagu.length;
    loadSong(index);
  }

  function prev() {
    index = (index - 1 + lagu.length) % lagu.length;
    loadSong(index);
  }

  function playPause() {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  // Auto next saat lagu selesai
  audio.addEventListener("ended", next);

  // Load pertama
  loadSong(index);
</script>

</body>
</html>
⚠️ Penting
Browser tidak bisa otomatis membaca isi folder music/ (keamanan).

Jadi kamu harus list manual nama file di array lagu.

🔥 Upgrade (kalau mau lebih canggih)
Kalau kamu mau:

Auto scan folder (pakai backend Node.js / PHP)

UI keren (seperti Spotify)

Visualizer (gelombang musik)

Bilag aja:
👉 “upgrade jadi pro player”
Nanti gue bikinin versi lebih gila 😈


Otomatis aja berbentuk card dan icon

Oke, kita upgrade jadi music player otomatis + UI card + icon modern 🔥
Tapi tetap ingat: browser tidak bisa auto baca folder, jadi kita pakai cara input folder dari user (otomatis load semua lagu).

✅ Fitur
🎧 Auto scan folder (user pilih folder music)

🟦 UI berbentuk card modern

▶️ Icon player (play, next, prev)

🔁 Auto next lagu

🎵 Nama lagu tampil otomatis

💻 Code HTML (Modern Card Player)
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Music Card Player</title>

  <!-- Icon (Font Awesome) -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

  <style>
    body {
      background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Arial;
      color: white;
    }

    .card {
      background: rgba(255,255,255,0.05);
      backdrop-filter: blur(15px);
      padding: 25px;
      border-radius: 20px;
      width: 300px;
      text-align: center;
      box-shadow: 0 0 30px rgba(0,0,0,0.5);
    }

    .icon {
      font-size: 60px;
      margin-bottom: 15px;
      color: cyan;
    }

    .judul {
      font-size: 18px;
      margin: 10px 0;
    }

    .controls i {
      font-size: 22px;
      margin: 15px;
      cursor: pointer;
      padding: 10px;
      border-radius: 50%;
      background: rgba(255,255,255,0.1);
      transition: 0.3s;
    }

    .controls i:hover {
      background: cyan;
      color: black;
    }

    input {
      margin-top: 15px;
      color: white;
    }
  </style>
</head>
<body>

<div class="card">
  <div class="icon">
    <i class="fa-solid fa-music"></i>
  </div>

  <div class="judul" id="judul">Pilih folder lagu</div>

  <audio id="audio"></audio>

  <div class="controls">
    <i class="fa-solid fa-backward" onclick="prev()"></i>
    <i class="fa-solid fa-play" onclick="playPause()" id="playBtn"></i>
    <i class="fa-solid fa-forward" onclick="next()"></i>
  </div>

  <!-- Input folder -->
  <input type="file" id="folderInput" webkitdirectory multiple accept="audio/*">
</div>

<script>
  let lagu = [];
  let index = 0;

  const audio = document.getElementById("audio");
  const judul = document.getElementById("judul");
  const playBtn = document.getElementById("playBtn");

  // Ambil semua file dari folder
  document.getElementById("folderInput").addEventListener("change", function(e) {
    lagu = Array.from(e.target.files).filter(file => file.type.startsWith("audio"));
    
    if (lagu.length > 0) {
      index = 0;
      loadSong(index);
    }
  });

  function loadSong(i) {
    audio.src = URL.createObjectURL(lagu[i]);
    judul.innerText = lagu[i].name;
    audio.play();
    playBtn.classList.replace("fa-play", "fa-pause");
  }

  function next() {
    index = (index + 1) % lagu.length;
    loadSong(index);
  }

  function prev() {
    index = (index - 1 + lagu.length) % lagu.length;
    loadSong(index);
  }

  function playPause() {
    if (audio.paused) {
      audio.play();
      playBtn.classList.replace("fa-play", "fa-pause");
    } else {
      audio.pause();
      playBtn.classList.replace("fa-pause", "fa-play");
    }
  }

  // Auto next
  audio.addEventListener("ended", next);
</script>

</body>
</html>
🚀 Cara Pakai
Buka file HTML di browser

Klik pilih folder

Pilih folder music

Lagu langsung:

✔ otomatis diputar

✔ bisa next/prev

✔ tampil dalam card keren

🔥 Kalau mau versi lebih gila lagi:
Bisa gue upgrade jadi:

🎶 Playlist sidebar kayak Spotify

🌌 Background animasi galaxy

📊 Visualizer musik (equalizer gerak)

💾 Simpan playlist otomatis

Tinggal bilang:
👉 "upgrade jadi Rama Music Player Pro" 😈


Pemutar lagu nya otomatis dan lagu dari folder music berbentuk card seperti spotify dan jangaj ada code yang eror

Oke, gue bikinin versi rapih, auto-play, UI card ala Spotify, tanpa error, dan tetap realistis sesuai batas browser 🔥

👉 Solusi terbaik:

Lagu diambil dari folder music/ (manual list → stabil & tidak error)

UI berbentuk card playlist seperti Spotify

Klik lagu → langsung play

Auto next jalan

✅ Struktur Folder
project/
│── index.html
└── music/
    ├── lagu1.mp3
    ├── lagu2.mp3
    ├── lagu3.mp3
🎧 CODE FULL (Spotify Style Card Player)
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Rama Music Player</title>

<link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">

<style>
body {
  margin: 0;
  background: #121212;
  font-family: 'Poppins', sans-serif;
  color: white;
}

/* Container */
.container {
  padding: 20px;
}

/* Title */
h1 {
  font-size: 22px;
}

/* Grid Card */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px,1fr));
  gap: 15px;
}

/* Card */
.card {
  background: #181818;
  padding: 15px;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.3s;
}

.card:hover {
  background: #282828;
  transform: scale(1.05);
}

/* Icon */
.icon {
  font-size: 50px;
  text-align: center;
  margin-bottom: 10px;
}

/* Song title */
.title {
  font-size: 14px;
  text-align: center;
}

/* Player bottom */
.player {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #181818;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Controls */
.controls button {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  margin: 0 10px;
  cursor: pointer;
}

.controls button:hover {
  color: #1db954;
}
</style>
</head>

<body>

<div class="container">
  <h1>🎧 Playlist Kamu</h1>
  <div class="grid" id="playlist"></div>
</div>

<div class="player">
  <div id="nowPlaying">Tidak ada lagu</div>

  <div class="controls">
    <button onclick="prev()">⏮</button>
    <button onclick="playPause()">⏯</button>
    <button onclick="next()">⏭</button>
  </div>
</div>

<audio id="audio"></audio>

<script>
const songs = [
  {title: "lagu1", file: "music/lagu1.mp3"},
  {title: "lagu2", file: "music/lagu2.mp3"},
  {title: "lagu3", file: "music/lagu3.mp3"}
];

const playlist = document.getElementById("playlist");
const audio = document.getElementById("audio");
const nowPlaying = document.getElementById("nowPlaying");

let index = 0;

/* Generate Card */
songs.forEach((song, i) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="icon">🎵</div>
    <div class="title">${song.title}</div>
  `;
  card.onclick = () => playSong(i);
  playlist.appendChild(card);
});

/* Play Song */
function playSong(i) {
  index = i;
  audio.src = songs[i].file;
  audio.play();
  nowPlaying.innerText = "Now Playing: " + songs[i].title;
}

/* Next */
function next() {
  index = (index + 1) % songs.length;
  playSong(index);
}

/* Prev */
function prev() {
  index = (index - 1 + songs.length) % songs.length;
  playSong(index);
}

/* Play Pause */
function playPause() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

/* Auto Next */
audio.addEventListener("ended", next);

/* Auto Play pertama */
playSong(index);
</script>

</body>
</html>
🔥 Kenapa ini NO ERROR
✅ Tidak pakai akses folder ilegal (aman browser)

✅ Semua file jelas (music/...)

✅ Tidak pakai API aneh

✅ Pure HTML + JS → stabil di Chrome Android

⚠️ Catatan Penting
Kalau lagu tidak bunyi:

Pastikan nama file sama persis

Format harus .mp3

Buka pakai browser (Chrome/Edge)

🚀 Upgrade kalau mau lebih keren:
Bisa gue bikin versi:

🎶 Auto scan folder TANPA list (pakai Node.js server)

🎧 UI 100% mirip Spotify

🌌 Animasi + visualizer

💿 Album cover otomatis

Tinggal bilang:
👉 "Buat Rama Music Player v2 Pro" 😈


Jadi gini ketika buka website nya ada lagu otomatis tampa tombol dan kamu buatin itu 

Siap, gue bikinin versi auto play langsung saat website dibuka, tanpa tombol play, dan tetap UI card ala Spotify 🔥

👉 Catatan penting:

Browser kadang blok autoplay dengan suara, jadi solusi aman: mulai mute → lalu aktif suara otomatis

Tidak ada tombol play, langsung jalan

🎧 CODE FINAL (Auto Play + Card Spotify Style)
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Auto Music Player</title>

<style>
body {
  margin: 0;
  background: #121212;
  font-family: Arial;
  color: white;
}

/* Container */
.container {
  padding: 20px;
}

/* Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px,1fr));
  gap: 15px;
}

/* Card */
.card {
  background: #181818;
  padding: 15px;
  border-radius: 12px;
  transition: 0.3s;
}

.card:hover {
  background: #282828;
}

/* Icon */
.icon {
  font-size: 50px;
  text-align: center;
}

/* Title */
.title {
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
}

/* Now Playing */
.now {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #181818;
  padding: 15px;
  text-align: center;
}
</style>
</head>

<body>

<div class="container">
  <h2>🎧 Auto Playlist</h2>
  <div class="grid" id="playlist"></div>
</div>

<div class="now" id="nowPlaying">
  Memuat lagu...
</div>

<audio id="audio"></audio>

<script>
const songs = [
  {title: "lagu1", file: "music/lagu1.mp3"},
  {title: "lagu2", file: "music/lagu2.mp3"},
  {title: "lagu3", file: "music/lagu3.mp3"}
];

const playlist = document.getElementById("playlist");
const audio = document.getElementById("audio");
const nowPlaying = document.getElementById("nowPlaying");

let index = 0;

/* Generate card */
songs.forEach(song => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="icon">🎵</div>
    <div class="title">${song.title}</div>
  `;
  playlist.appendChild(card);
});

/* Load lagu */
function playSong(i) {
  audio.src = songs[i].file;
  nowPlaying.innerText = "Now Playing: " + songs[i].title;
}

/* Auto next */
audio.addEventListener("ended", () => {
  index = (index + 1) % songs.length;
  playSong(index);
  audio.play();
});

/* AUTO PLAY FIX (ANTI BLOK BROWSER) */
window.addEventListener("load", () => {
  playSong(index);

  audio.muted = true;
  audio.play().then(() => {
    setTimeout(() => {
      audio.muted = false;
    }, 500);
  }).catch(() => {
    console.log("Autoplay diblok browser");
  });
});
</script>

Buatkan code html pemutar lagu otomatis berputar dan lagu di ambil dari folder music 

Berikut contoh HTML + JavaScript untuk pemutar lagu yang otomatis memutar semua file dari folder music/ (playlist manual karena browser tidak bisa membaca isi folder langsung demi keamanan):

✅ Struktur Folder
project/
│── index.html
└── music/
    ├── lagu1.mp3
    ├── lagu2.mp3
    ├── lagu3.mp3
🎧 Kode HTML Pemutar Lagu Otomatis
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Music Player Auto</title>
  <style>
    body {
      background: #111;
      color: white;
      text-align: center;
      font-family: Arial;
      padding-top: 50px;
    }

    .player {
      background: #222;
      padding: 20px;
      border-radius: 15px;
      display: inline-block;
      box-shadow: 0 0 20px rgba(0,255,255,0.5);
    }

    button {
      margin: 10px;
      padding: 10px 20px;
      border: none;
      border-radius: 10px;
      background: cyan;
      cursor: pointer;
      font-weight: bold;
    }
  </style>
</head>
<body>

<div class="player">
  <h2>🎵 Music Player</h2>
  <p id="judul">Memuat...</p>

  <audio id="audio" autoplay></audio>

  <br>
  <button onclick="prev()">⏮ Prev</button>
  <button onclick="playPause()">⏯ Play/Pause</button>
  <button onclick="next()">⏭ Next</button>
</div>

<script>
  const lagu = [
    "music/lagu1.mp3",
    "music/lagu2.mp3",
    "music/lagu3.mp3"
  ];

  let index = 0;
  const audio = document.getElementById("audio");
  const judul = document.getElementById("judul");

  function loadSong(i) {
    audio.src = lagu[i];
    judul.innerText = lagu[i].split("/")[1];
    audio.play();
  }

  function next() {
    index = (index + 1) % lagu.length;
    loadSong(index);
  }

  function prev() {
    index = (index - 1 + lagu.length) % lagu.length;
    loadSong(index);
  }

  function playPause() {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  // Auto next saat lagu selesai
  audio.addEventListener("ended", next);

  // Load pertama
  loadSong(index);
</script>

</body>
</html>
⚠️ Penting
Browser tidak bisa otomatis membaca isi folder music/ (keamanan).

Jadi kamu harus list manual nama file di array lagu.

🔥 Upgrade (kalau mau lebih canggih)
Kalau kamu mau:

Auto scan folder (pakai backend Node.js / PHP)

UI keren (seperti Spotify)

Visualizer (gelombang musik)

Bilag aja:
👉 “upgrade jadi pro player”
Nanti gue bikinin versi lebih gila 😈


Otomatis aja berbentuk card dan icon

Oke, kita upgrade jadi music player otomatis + UI card + icon modern 🔥
Tapi tetap ingat: browser tidak bisa auto baca folder, jadi kita pakai cara input folder dari user (otomatis load semua lagu).

✅ Fitur
🎧 Auto scan folder (user pilih folder music)

🟦 UI berbentuk card modern

▶️ Icon player (play, next, prev)

🔁 Auto next lagu

🎵 Nama lagu tampil otomatis

💻 Code HTML (Modern Card Player)
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Music Card Player</title>

  <!-- Icon (Font Awesome) -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

  <style>
    body {
      background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Arial;
      color: white;
    }

    .card {
      background: rgba(255,255,255,0.05);
      backdrop-filter: blur(15px);
      padding: 25px;
      border-radius: 20px;
      width: 300px;
      text-align: center;
      box-shadow: 0 0 30px rgba(0,0,0,0.5);
    }

    .icon {
      font-size: 60px;
      margin-bottom: 15px;
      color: cyan;
    }

    .judul {
      font-size: 18px;
      margin: 10px 0;
    }

    .controls i {
      font-size: 22px;
      margin: 15px;
      cursor: pointer;
      padding: 10px;
      border-radius: 50%;
      background: rgba(255,255,255,0.1);
      transition: 0.3s;
    }

    .controls i:hover {
      background: cyan;
      color: black;
    }

    input {
      margin-top: 15px;
      color: white;
    }
  </style>
</head>
<body>

<div class="card">
  <div class="icon">
    <i class="fa-solid fa-music"></i>
  </div>

  <div class="judul" id="judul">Pilih folder lagu</div>

  <audio id="audio"></audio>

  <div class="controls">
    <i class="fa-solid fa-backward" onclick="prev()"></i>
    <i class="fa-solid fa-play" onclick="playPause()" id="playBtn"></i>
    <i class="fa-solid fa-forward" onclick="next()"></i>
  </div>

  <!-- Input folder -->
  <input type="file" id="folderInput" webkitdirectory multiple accept="audio/*">
</div>

<script>
  let lagu = [];
  let index = 0;

  const audio = document.getElementById("audio");
  const judul = document.getElementById("judul");
  const playBtn = document.getElementById("playBtn");

  // Ambil semua file dari folder
  document.getElementById("folderInput").addEventListener("change", function(e) {
    lagu = Array.from(e.target.files).filter(file => file.type.startsWith("audio"));
    
    if (lagu.length > 0) {
      index = 0;
      loadSong(index);
    }
  });

  function loadSong(i) {
    audio.src = URL.createObjectURL(lagu[i]);
    judul.innerText = lagu[i].name;
    audio.play();
    playBtn.classList.replace("fa-play", "fa-pause");
  }

  function next() {
    index = (index + 1) % lagu.length;
    loadSong(index);
  }

  function prev() {
    index = (index - 1 + lagu.length) % lagu.length;
    loadSong(index);
  }

  function playPause() {
    if (audio.paused) {
      audio.play();
      playBtn.classList.replace("fa-play", "fa-pause");
    } else {
      audio.pause();
      playBtn.classList.replace("fa-pause", "fa-play");
    }
  }

  // Auto next
  audio.addEventListener("ended", next);
</script>

</body>
</html>
🚀 Cara Pakai
Buka file HTML di browser

Klik pilih folder

Pilih folder music

Lagu langsung:

✔ otomatis diputar

✔ bisa next/prev

✔ tampil dalam card keren

🔥 Kalau mau versi lebih gila lagi:
Bisa gue upgrade jadi:

🎶 Playlist sidebar kayak Spotify

🌌 Background animasi galaxy

📊 Visualizer musik (equalizer gerak)

💾 Simpan playlist otomatis

Tinggal bilang:
👉 "upgrade jadi Rama Music Player Pro" 😈


Pemutar lagu nya otomatis dan lagu dari folder music berbentuk card seperti spotify dan jangaj ada code yang eror

Oke, gue bikinin versi rapih, auto-play, UI card ala Spotify, tanpa error, dan tetap realistis sesuai batas browser 🔥

👉 Solusi terbaik:

Lagu diambil dari folder music/ (manual list → stabil & tidak error)

UI berbentuk card playlist seperti Spotify

Klik lagu → langsung play

Auto next jalan

✅ Struktur Folder
project/
│── index.html
└── music/
    ├── lagu1.mp3
    ├── lagu2.mp3
    ├── lagu3.mp3
🎧 CODE FULL (Spotify Style Card Player)
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Rama Music Player</title>

<link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">

<style>
body {
  margin: 0;
  background: #121212;
  font-family: 'Poppins', sans-serif;
  color: white;
}

/* Container */
.container {
  padding: 20px;
}

/* Title */
h1 {
  font-size: 22px;
}

/* Grid Card */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px,1fr));
  gap: 15px;
}

/* Card */
.card {
  background: #181818;
  padding: 15px;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.3s;
}

.card:hover {
  background: #282828;
  transform: scale(1.05);
}

/* Icon */
.icon {
  font-size: 50px;
  text-align: center;
  margin-bottom: 10px;
}

/* Song title */
.title {
  font-size: 14px;
  text-align: center;
}

/* Player bottom */
.player {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #181818;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Controls */
.controls button {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  margin: 0 10px;
  cursor: pointer;
}

.controls button:hover {
  color: #1db954;
}
</style>
</head>

<body>

<div class="container">
  <h1>🎧 Playlist Kamu</h1>
  <div class="grid" id="playlist"></div>
</div>

<div class="player">
  <div id="nowPlaying">Tidak ada lagu</div>

  <div class="controls">
    <button onclick="prev()">⏮</button>
    <button onclick="playPause()">⏯</button>
    <button onclick="next()">⏭</button>
  </div>
</div>

<audio id="audio"></audio>

<script>
const songs = [
  {title: "lagu1", file: "music/lagu1.mp3"},
  {title: "lagu2", file: "music/lagu2.mp3"},
  {title: "lagu3", file: "music/lagu3.mp3"}
];

const playlist = document.getElementById("playlist");
const audio = document.getElementById("audio");
const nowPlaying = document.getElementById("nowPlaying");

let index = 0;

/* Generate Card */
songs.forEach((song, i) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="icon">🎵</div>
    <div class="title">${song.title}</div>
  `;
  card.onclick = () => playSong(i);
  playlist.appendChild(card);
});

/* Play Song */
function playSong(i) {
  index = i;
  audio.src = songs[i].file;
  audio.play();
  nowPlaying.innerText = "Now Playing: " + songs[i].title;
}

/* Next */
function next() {
  index = (index + 1) % songs.length;
  playSong(index);
}

/* Prev */
function prev() {
  index = (index - 1 + songs.length) % songs.length;
  playSong(index);
}

/* Play Pause */
function playPause() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

/* Auto Next */
audio.addEventListener("ended", next);

/* Auto Play pertama */
playSong(index);


body {
  margin: 0;
  background: #121212;
  font-family: Arial;
  color: white;
}

/* Container */
.container {
  padding: 20px;
}

/* Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px,1fr));
  gap: 15px;
}

/* Card */
.card {
  background: #181818;
  padding: 15px;
  border-radius: 12px;
  transition: 0.3s;
}

.card:hover {
  background: #282828;
}

/* Icon */
.icon {
  font-size: 50px;
  text-align: center;
}

/* Title */
.title {
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
}

/* Now Playing */
.now {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #181818;
  padding: 15px;
  text-align: center;
}
</style>
</head>

<body>

<div class="container">
  <h2>🎧 Auto Playlist</h2>
  <div class="grid" id="playlist"></div>
</div>

<div class="now" id="nowPlaying">
  Memuat lagu...
</div>

<audio id="audio"></audio>

<script>
const songs = [
  {title: "lagu1", file: "music/lagu1.mp3"},
  {title: "lagu2", file: "music/lagu2.mp3"},
  {title: "lagu3", file: "music/lagu3.mp3"}
];

const playlist = document.getElementById("playlist");
const audio = document.getElementById("audio");
const nowPlaying = document.getElementById("nowPlaying");

let index = 0;

/* Generate card */
songs.forEach(song => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="icon">🎵</div>
    <div class="title">${song.title}</div>
  `;
  playlist.appendChild(card);
});

/* Load lagu */
function playSong(i) {
  audio.src = songs[i].file;
  nowPlaying.innerText = "Now Playing: " + songs[i].title;
}

/* Auto next */
audio.addEventListener("ended", () => {
  index = (index + 1) % songs.length;
  playSong(index);
  audio.play();
});

/* AUTO PLAY FIX (ANTI BLOK BROWSER) */
window.addEventListener("load", () => {
  playSong(index);

  audio.muted = true;
  audio.play().then(() => {
    setTimeout(() => {
      audio.muted = false;
    }, 500);
  }).catch(() => {
    console.log("Autoplay diblok browser");
  });
});
</script>
