<template>
  <!-- NAV -->
  <nav>
    <a href="#" class="nav-brand">
      <div class="nav-logo">
        <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 3h11M2 7.5h7M2 12h8.5" stroke="white" stroke-width="1.75" stroke-linecap="round" />
        </svg>
      </div>
      <span class="nav-name">Kwitansi</span>
    </a>
    <ul class="nav-links">
      <li><a href="#features">Fitur</a></li>
      <li><a href="#cara-kerja">Cara Kerja</a></li>
      <li><a href="#harga">Harga</a></li>
    </ul>
    <div class="nav-cta">
      <!-- <a href="#" class="btn-ghost">Masuk</a> -->
      <NuxtLink to="/guest" class="btn-primary">
        Mulai Gratis
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </NuxtLink>
    </div>
  </nav>

  <!-- HERO -->
  <section class="hero">
    <div class="hero-badge">
      <span class="hero-badge-dot"></span>
      Invoice Generator untuk UMKM Indonesia
    </div>

    <h1 class="hero-title">
      Buat invoice<br><strong>dalam 60 detik.</strong>
    </h1>

    <p class="hero-sub">
      Tidak ada setup rumit. Isi form, pilih template, unduh PDF — selesai.
    </p>

    <div class="hero-actions">
      <NuxtLink to="/guest" class="btn-hero">
        Buat Invoice Sekarang
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2.5 7h9M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </NuxtLink>
      <a href="#cara-kerja" class="btn-hero-outline">
        Lihat Cara Kerja
      </a>
    </div>

    <p class="hero-note">Gratis selamanya untuk 5 invoice/bulan · Tanpa kartu kredit</p>

    <!-- Mock UI Preview -->
    <div class="hero-preview">
      <div class="preview-frame">
        <div class="preview-bar">
          <div class="dot dot-red"></div>
          <div class="dot dot-yellow"></div>
          <div class="dot dot-green"></div>
          <div class="preview-url">
            <span class="url-pill">kwitansi.vercel.app</span>
          </div>
        </div>
        <div class="preview-body">
          <!-- Form side -->
          <div class="preview-left">
            <div class="mock-section">
              <div class="mock-section-label">
                <span class="mock-dot"></span>
                Informasi Bisnis
              </div>
              <div class="mock-fields">
                <div class="mock-field"></div>
                <div class="mock-field"></div>
                <div class="mock-field"></div>
                <div class="mock-field"></div>
                <div class="mock-field mock-field-wide"></div>
              </div>
            </div>
            <div class="mock-section">
              <div class="mock-section-label">
                <span class="mock-dot"></span>
                Detail Item
              </div>
              <div class="mock-items-header">
                <div class="mock-col-label"></div>
                <div class="mock-col-label"></div>
                <div class="mock-col-label"></div>
              </div>
              <div class="mock-item-row">
                <div class="mock-cell"></div>
                <div class="mock-cell"></div>
                <div class="mock-cell"></div>
              </div>
              <div class="mock-item-row">
                <div class="mock-cell"></div>
                <div class="mock-cell"></div>
                <div class="mock-cell"></div>
              </div>
              <div class="mock-total-bar">
                <div class="mock-total-label"></div>
                <div class="mock-total-value"></div>
              </div>
            </div>
          </div>
          <!-- Invoice preview side -->
          <div class="preview-right">
            <div class="invoice-mock">
              <div class="inv-header">
                <div class="inv-brand-block">
                  <div class="inv-brand-bar"></div>
                  <div class="inv-brand-sub"></div>
                </div>
                <div class="inv-number"></div>
              </div>
              <div class="inv-divider"></div>
              <div class="inv-meta">
                <div class="inv-meta-block">
                  <div class="inv-meta-label"></div>
                  <div class="inv-meta-value"></div>
                </div>
                <div class="inv-meta-block">
                  <div class="inv-meta-label"></div>
                  <div class="inv-meta-value"></div>
                </div>
              </div>
              <div class="inv-table">
                <div class="inv-table-head">
                  <div class="inv-th"></div>
                  <div class="inv-th"></div>
                  <div class="inv-th"></div>
                </div>
                <div class="inv-row">
                  <div class="inv-td"></div>
                  <div class="inv-td"></div>
                  <div class="inv-td accent"></div>
                </div>
                <div class="inv-row">
                  <div class="inv-td"></div>
                  <div class="inv-td"></div>
                  <div class="inv-td accent"></div>
                </div>
                <div class="inv-row">
                  <div class="inv-td"></div>
                  <div class="inv-td"></div>
                  <div class="inv-td accent"></div>
                </div>
              </div>
              <div class="inv-total">
                <div class="inv-total-label"></div>
                <div class="inv-total-value"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- STATS -->
  <div class="stats reveal">
    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-number"><span>12k+</span></div>
        <div class="stat-desc">Invoice dibuat setiap bulan</div>
      </div>
      <div class="stat-item">
        <div class="stat-number"><span>3</span> template</div>
        <div class="stat-desc">Siap pakai, siap kirim</div>
      </div>
      <div class="stat-item">
        <div class="stat-number"><span>60</span> detik</div>
        <div class="stat-desc">Rata-rata waktu pembuatan</div>
      </div>
    </div>
  </div>

  <!-- FEATURES -->
  <section class="features" id="features">
    <div class="reveal">
      <span class="section-tag">Fitur</span>
      <h2 class="section-title">Semua yang kamu butuhkan,<br><strong>tidak lebih.</strong></h2>
      <p class="section-sub">Tanpa fitur bloat yang membingungkan. Fokus pada yang penting.</p>
    </div>

    <div class="features-grid reveal">
      <div class="feature-card">
        <div class="feature-icon">
          <svg viewBox="0 0 17 17" fill="none">
            <rect x="2" y="2" width="13" height="13" rx="2.5" stroke="currentColor" stroke-width="1.5" />
            <path d="M5 8.5h7M5 6h4M5 11h5.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" />
          </svg>
        </div>
        <div class="feature-title">3 Template Profesional</div>
        <div class="feature-desc">Modern, Classic, Minimal. Pilih sesuai brand bisnis kamu.</div>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <svg viewBox="0 0 17 17" fill="none">
            <path d="M3 14V4a1 1 0 011-1h7l3 3v10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            <path d="M10 3v3h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            <path d="M6 9h5M6 11.5h3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" />
          </svg>
        </div>
        <div class="feature-title">Ekspor PDF Instan</div>
        <div class="feature-desc">Unduh PDF siap kirim dalam satu klik. Kualitas cetak tinggi.</div>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <svg viewBox="0 0 17 17" fill="none">
            <path d="M8.5 2.5L10.5 6.5L15 7.2L11.75 10.3L12.5 14.5L8.5 12.4L4.5 14.5L5.25 10.3L2 7.2L6.5 6.5L8.5 2.5Z"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div class="feature-title">Diskon & Pajak Otomatis</div>
        <div class="feature-desc">Perhitungan PPN, diskon persen atau nominal — semua otomatis.</div>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <svg viewBox="0 0 17 17" fill="none">
            <circle cx="8.5" cy="8.5" r="6" stroke="currentColor" stroke-width="1.5" />
            <path d="M8.5 5.5v3l2 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </div>
        <div class="feature-title">Pratinjau Real-time</div>
        <div class="feature-desc">Lihat hasilnya langsung saat mengetik. Tidak ada kejutan.</div>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <svg viewBox="0 0 17 17" fill="none">
            <rect x="2" y="4" width="7" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5" />
            <rect x="8" y="4" width="7" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5" />
            <path d="M5.5 7h2M5.5 9.5h1" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" />
            <path d="M11 7h2M11 9.5h1" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" />
          </svg>
        </div>
        <div class="feature-title">Info Bank Tersimpan</div>
        <div class="feature-desc">Isi sekali, otomatis muncul di setiap invoice berikutnya.</div>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <svg viewBox="0 0 17 17" fill="none">
            <path d="M3 11.5L6.5 8l2.5 2.5 4-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round" />
            <rect x="2" y="2" width="13" height="13" rx="2.5" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </div>
        <div class="feature-title">Riwayat Invoice</div>
        <div class="feature-desc">Akses dan duplikasi invoice lama kapan saja.</div>
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section class="steps" id="cara-kerja">
    <div class="reveal">
      <span class="section-tag">Cara Kerja</span>
      <h2 class="section-title">Tiga langkah,<br><strong>satu invoice.</strong></h2>
      <p class="section-sub">Tidak perlu training. Langsung pakai.</p>
    </div>

    <div class="steps-grid reveal">
      <div class="step-item">
        <div class="step-num">01</div>
        <div class="step-title">Isi Detail Invoice</div>
        <div class="step-desc">Masukkan info bisnis, klien, dan item layanan. Form simpel, tidak membingungkan.</div>
      </div>
      <div class="step-item">
        <div class="step-num">02</div>
        <div class="step-title">Pilih Template</div>
        <div class="step-desc">Tiga pilihan template profesional. Pratinjau langsung di layar sebelum unduh.</div>
      </div>
      <div class="step-item">
        <div class="step-num">03</div>
        <div class="step-title">Unduh & Kirim</div>
        <div class="step-desc">Satu klik jadi PDF. Siap dikirim ke klien via email atau WhatsApp.</div>
      </div>
    </div>
  </section>

  <!-- PRICING -->
  <section class="pricing" id="harga">
    <div class="reveal">
      <span class="section-tag">Harga</span>
      <h2 class="section-title">Sederhana.<br><strong>Tidak ada kejutan.</strong></h2>
      <p class="section-sub">Mulai gratis, upgrade kalau butuh lebih.</p>
    </div>

    <div class="pricing-cards reveal">
      <!-- Free -->
      <div class="price-card">
        <div class="price-plan">Gratis</div>
        <div class="price-amount">
          <span class="price-currency">Rp</span>
          <span class="price-value">0</span>
          <span class="price-period">/ bulan</span>
        </div>
        <div class="price-divider"></div>
        <ul class="price-features">
          <li>
            <div class="check-icon"><svg viewBox="0 0 9 9" fill="none">
                <path d="M1.5 4.5l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg></div>
            5 invoice per bulan
          </li>
          <li>
            <div class="check-icon"><svg viewBox="0 0 9 9" fill="none">
                <path d="M1.5 4.5l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg></div>
            3 template tersedia
          </li>
          <li>
            <div class="check-icon"><svg viewBox="0 0 9 9" fill="none">
                <path d="M1.5 4.5l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg></div>
            Ekspor PDF
          </li>
          <li>
            <div class="check-icon"><svg viewBox="0 0 9 9" fill="none">
                <path d="M1.5 4.5l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg></div>
            Tanpa watermark
          </li>
        </ul>
        <a href="#" class="price-btn price-btn--outline">Mulai Gratis</a>
      </div>

      <!-- Pro -->
      <div class="price-card price-card--featured">
        <div class="price-plan">Pro</div>
        <div class="price-amount">
          <span class="price-currency">Rp</span>
          <span class="price-value">49k</span>
          <span class="price-period">/ bulan</span>
        </div>
        <div class="price-divider"></div>
        <ul class="price-features">
          <li>
            <div class="check-icon"><svg viewBox="0 0 9 9" fill="none">
                <path d="M1.5 4.5l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg></div>
            Invoice tak terbatas
          </li>
          <li>
            <div class="check-icon"><svg viewBox="0 0 9 9" fill="none">
                <path d="M1.5 4.5l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg></div>
            Logo bisnis custom
          </li>
          <li>
            <div class="check-icon"><svg viewBox="0 0 9 9" fill="none">
                <path d="M1.5 4.5l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg></div>
            Riwayat invoice lengkap
          </li>
          <li>
            <div class="check-icon"><svg viewBox="0 0 9 9" fill="none">
                <path d="M1.5 4.5l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg></div>
            Warna aksen custom
          </li>
          <li>
            <div class="check-icon"><svg viewBox="0 0 9 9" fill="none">
                <path d="M1.5 4.5l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg></div>
            Prioritas dukungan
          </li>
        </ul>
        <a href="#" class="price-btn price-btn--solid">Cooming Soon</a>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta-section reveal">
    <div class="cta-box">
      <h2 class="cta-title">Buat invoice pertamamu<br><strong>sekarang.</strong></h2>
      <p class="cta-sub">Gratis. Tidak perlu daftar. Mulai dalam 10 detik.</p>
      <div class="cta-actions">
        <NuxtLink to="/guest" class="btn-cta-primary">
          Buat Invoice Sekarang
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 7h9M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </NuxtLink>
        <a href="#harga" class="btn-cta-outline">Lihat Harga</a>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <a href="#" class="footer-brand">
      <div class="footer-logo">
        <svg viewBox="0 0 12 12" fill="none">
          <path d="M1.5 2.5h9M1.5 6h6M1.5 9.5h7" stroke="white" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      </div>
      <span class="footer-name">Kwitansi</span>
    </a>
    <span class="footer-copy">© 2026 Kwitansi. Dibuat dengan ❤ <a href="https://sfauzi.dev" target="_blank" rel="noopener noreferrer" class="font-Mansalva hover:underline">sfauzi.dev</a>.</span>
  </footer>
</template>

<script setup>
onMounted(() => {
  const reveals = document.querySelectorAll('.reveal')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  )

  reveals.forEach((el) => observer.observe(el))

  const nav = document.querySelector('nav')
  const onScroll = () => {
    if (!nav) return
    nav.style.borderBottomColor = '#E2E8F0'
  }

  window.addEventListener('scroll', onScroll)
  onScroll()

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    observer.disconnect()
  })
})
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --blue: #2563EB;
  --blue-dark: #1D4ED8;
  --blue-light: #EFF6FF;
  --blue-mid: #BFDBFE;
  --ink: #0A0F1E;
  --ink-2: #1E2A3D;
  --muted: #64748B;
  --subtle: #94A3B8;
  --line: #E2E8F0;
  --bg: #FAFBFF;
  --white: #FFFFFF;
  --radius: 14px;
  --font: 'DM Sans', system-ui, sans-serif;
  --mono: 'DM Mono', monospace;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font);
  background: var(--bg);
  color: var(--ink);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* ── NAV ── */
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 2rem;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(250, 251, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 9px;
  text-decoration: none;
}

.nav-logo {
  width: 28px;
  height: 28px;
  background: var(--blue);
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.nav-logo svg {
  width: 15px;
  height: 15px;
}

.nav-name {
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--ink);
  letter-spacing: -0.02em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style: none;
}

.nav-links a {
  font-size: 0.875rem;
  color: var(--muted);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.15s;
}

.nav-links a:hover {
  color: var(--ink);
}

.nav-cta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.btn-ghost {
  font-family: var(--font);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--muted);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 0;
  text-decoration: none;
  transition: color 0.15s;
}

.btn-ghost:hover {
  color: var(--ink);
}

.btn-primary {
  font-family: var(--font);
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  background: var(--blue);
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.125rem;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.15s, box-shadow 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn-primary:hover {
  background: var(--blue-dark);
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
}

/* ── HERO ── */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8rem 2rem 6rem;
  position: relative;
  overflow: hidden;
}

/* subtle grid bg */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 48px 48px;
  opacity: 0.5;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%);
}

/* blue glow */
.hero::after {
  content: '';
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 400px;
  background: radial-gradient(ellipse, rgba(37, 99, 235, 0.12) 0%, transparent 70%);
  pointer-events: none;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  background: var(--blue-light);
  border: 1px solid var(--blue-mid);
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--blue);
  letter-spacing: 0.03em;
  text-transform: uppercase;
  margin-bottom: 1.75rem;
  position: relative;
  animation: fadeUp 0.6s ease both;
}

.hero-badge-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--blue);
  animation: pulse 2s ease infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.5;
    transform: scale(0.75);
  }
}

.hero-title {
  font-size: clamp(2.75rem, 6vw, 5rem);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.04em;
  color: var(--ink);
  max-width: 720px;
  margin-bottom: 1.5rem;
  position: relative;
  animation: fadeUp 0.6s 0.1s ease both;
}

.hero-title strong {
  font-weight: 600;
  color: var(--blue);
}

.hero-sub {
  font-size: 1.0625rem;
  color: var(--muted);
  max-width: 420px;
  line-height: 1.65;
  margin-bottom: 2.5rem;
  position: relative;
  animation: fadeUp 0.6s 0.2s ease both;
  font-weight: 400;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  animation: fadeUp 0.6s 0.3s ease both;
}

.btn-hero {
  font-family: var(--font);
  font-size: 0.9375rem;
  font-weight: 600;
  color: white;
  background: var(--blue);
  border: none;
  border-radius: 10px;
  padding: 0.75rem 1.75rem;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-hero:hover {
  background: var(--blue-dark);
  box-shadow: 0 6px 24px rgba(37, 99, 235, 0.4);
  transform: translateY(-1px);
}

.btn-hero:active {
  transform: translateY(0);
}

.btn-hero-outline {
  font-family: var(--font);
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--ink-2);
  background: white;
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 0.75rem 1.75rem;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-hero-outline:hover {
  border-color: #94A3B8;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.hero-note {
  margin-top: 1rem;
  font-size: 0.8125rem;
  color: var(--subtle);
  animation: fadeUp 0.6s 0.4s ease both;
  position: relative;
}

/* ── HERO PREVIEW ── */
.hero-preview {
  position: relative;
  margin-top: 5rem;
  width: 100%;
  max-width: 900px;
  animation: fadeUp 0.8s 0.5s ease both;
}

.preview-frame {
  background: white;
  border: 1px solid var(--line);
  border-radius: 18px;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.03),
    0 24px 64px rgba(37, 99, 235, 0.08),
    0 8px 24px rgba(0, 0, 0, 0.06);
}

.preview-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--line);
  background: #F8FAFF;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot-red {
  background: #FF5F57;
}

.dot-yellow {
  background: #FFBD2E;
}

.dot-green {
  background: #28C940;
}

.preview-url {
  flex: 1;
  display: flex;
  justify-content: center;
}

.url-pill {
  font-family: var(--mono);
  font-size: 0.6875rem;
  color: var(--subtle);
  background: white;
  border: 1px solid var(--line);
  border-radius: 100px;
  padding: 3px 12px;
}

.preview-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  min-height: 340px;
}

.preview-left {
  padding: 1.5rem;
  border-right: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.mock-section {
  background: #F8FAFF;
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 0.875rem;
}

.mock-section-label {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--subtle);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.625rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.mock-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--blue);
}

.mock-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}

.mock-field {
  height: 28px;
  background: white;
  border: 1px solid var(--line);
  border-radius: 6px;
}

.mock-field-wide {
  grid-column: 1 / -1;
}

.mock-items-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 4px;
  margin-bottom: 5px;
}

.mock-col-label {
  height: 14px;
  background: #E2E8F0;
  border-radius: 3px;
}

.mock-item-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 4px;
  margin-bottom: 4px;
}

.mock-cell {
  height: 22px;
  background: white;
  border: 1px solid var(--line);
  border-radius: 5px;
}

.mock-total-bar {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  align-items: center;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--line);
}

.mock-total-label {
  width: 50px;
  height: 14px;
  background: #E2E8F0;
  border-radius: 3px;
}

.mock-total-value {
  width: 70px;
  height: 18px;
  background: var(--blue);
  border-radius: 5px;
  opacity: 0.15;
}

.preview-right {
  padding: 1.5rem;
  background: #F8FAFF;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.invoice-mock {
  background: white;
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 1.25rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.inv-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.inv-brand-block {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.inv-brand-bar {
  width: 80px;
  height: 10px;
  background: var(--blue);
  border-radius: 3px;
  opacity: 0.9;
}

.inv-brand-sub {
  width: 50px;
  height: 6px;
  background: var(--line);
  border-radius: 2px;
}

.inv-number {
  width: 60px;
  height: 18px;
  background: var(--blue-light);
  border: 1px solid var(--blue-mid);
  border-radius: 5px;
}

.inv-divider {
  height: 1px;
  background: var(--line);
}

.inv-meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.inv-meta-block {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.inv-meta-label {
  width: 40px;
  height: 5px;
  background: var(--line);
  border-radius: 2px;
}

.inv-meta-value {
  width: 70px;
  height: 7px;
  background: #CBD5E1;
  border-radius: 2px;
}

.inv-table {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.inv-table-head {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 4px;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--line);
}

.inv-th {
  height: 7px;
  background: var(--line);
  border-radius: 2px;
}

.inv-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 4px;
  padding: 3px 0;
}

.inv-td {
  height: 8px;
  background: #F1F5F9;
  border-radius: 2px;
}

.inv-td.accent {
  background: rgba(37, 99, 235, 0.12);
}

.inv-total {
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px solid var(--line);
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  align-items: center;
}

.inv-total-label {
  width: 30px;
  height: 7px;
  background: var(--line);
  border-radius: 2px;
}

.inv-total-value {
  width: 56px;
  height: 10px;
  background: var(--blue);
  border-radius: 3px;
}

/* ── STATS ── */
.stats {
  padding: 0 2rem 6rem;
  max-width: 900px;
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
}

.stat-item {
  background: white;
  padding: 2rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-number {
  font-size: 2.25rem;
  font-weight: 300;
  letter-spacing: -0.04em;
  color: var(--ink);
  line-height: 1;
}

.stat-number span {
  color: var(--blue);
  font-weight: 600;
}

.stat-desc {
  font-size: 0.875rem;
  color: var(--muted);
  font-weight: 400;
}

/* ── FEATURES ── */
.features {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem 8rem;
}

.section-tag {
  display: inline-block;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--blue);
  margin-bottom: 1rem;
}

.section-title {
  font-size: clamp(1.75rem, 3.5vw, 2.75rem);
  font-weight: 300;
  letter-spacing: -0.035em;
  color: var(--ink);
  line-height: 1.2;
  margin-bottom: 0.75rem;
}

.section-title strong {
  font-weight: 600;
}

.section-sub {
  font-size: 1rem;
  color: var(--muted);
  max-width: 400px;
  line-height: 1.65;
  margin-bottom: 3.5rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
}

.feature-card {
  background: white;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  transition: background 0.2s;
}

.feature-card:hover {
  background: #FAFBFF;
}

.feature-icon {
  width: 36px;
  height: 36px;
  background: var(--blue-light);
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--blue);
  flex-shrink: 0;
}

.feature-icon svg {
  width: 17px;
  height: 17px;
}

.feature-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--ink);
  letter-spacing: -0.015em;
  line-height: 1.3;
}

.feature-desc {
  font-size: 0.875rem;
  color: var(--muted);
  line-height: 1.6;
}

/* ── STEPS ── */
.steps {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem 8rem;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3.5rem;
}

.step-item {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  position: relative;
}

/* connector line */
.step-item:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 18px;
  right: -1rem;
  width: 2rem;
  height: 1px;
  background: var(--line);
}

.step-num {
  width: 36px;
  height: 36px;
  background: var(--blue);
  color: white;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 700;
  font-family: var(--mono);
  flex-shrink: 0;
}

.step-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--ink);
  letter-spacing: -0.01em;
}

.step-desc {
  font-size: 0.875rem;
  color: var(--muted);
  line-height: 1.6;
}

/* ── PRICING ── */
.pricing {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 2rem 8rem;
}

.pricing-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 3.5rem;
}

.price-card {
  background: white;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  transition: box-shadow 0.2s;
}

.price-card:hover {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
}

.price-card--featured {
  border-color: var(--blue);
  background: var(--ink);
  position: relative;
  overflow: hidden;
}

.price-card--featured::before {
  content: '';
  position: absolute;
  top: -60px;
  right: -60px;
  width: 180px;
  height: 180px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.3), transparent 70%);
  pointer-events: none;
}

.price-plan {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}

.price-card--featured .price-plan {
  color: rgba(255, 255, 255, 0.5);
}

.price-amount {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.price-currency {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--muted);
}

.price-card--featured .price-currency {
  color: rgba(255, 255, 255, 0.6);
}

.price-value {
  font-size: 2.75rem;
  font-weight: 300;
  letter-spacing: -0.04em;
  color: var(--ink);
  line-height: 1;
}

.price-card--featured .price-value {
  color: white;
}

.price-period {
  font-size: 0.875rem;
  color: var(--subtle);
  align-self: flex-end;
  margin-bottom: 3px;
}

.price-card--featured .price-period {
  color: rgba(255, 255, 255, 0.4);
}

.price-divider {
  height: 1px;
  background: var(--line);
}

.price-card--featured .price-divider {
  background: rgba(255, 255, 255, 0.1);
}

.price-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  flex: 1;
}

.price-features li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: var(--ink-2);
}

.price-card--featured .price-features li {
  color: rgba(255, 255, 255, 0.8);
}

.check-icon {
  width: 16px;
  height: 16px;
  background: var(--blue-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.price-card--featured .check-icon {
  background: rgba(37, 99, 235, 0.4);
}

.check-icon svg {
  width: 9px;
  height: 9px;
  color: var(--blue);
}

.price-card--featured .check-icon svg {
  color: #93C5FD;
}

.price-btn {
  font-family: var(--font);
  font-size: 0.9375rem;
  font-weight: 600;
  width: 100%;
  padding: 0.75rem;
  border-radius: 9px;
  cursor: pointer;
  transition: all 0.15s;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.price-btn--outline {
  color: var(--ink);
  background: white;
  border: 1px solid var(--line);
}

.price-btn--outline:hover {
  border-color: #94A3B8;
}

.price-btn--solid {
  color: white;
  background: var(--blue);
  border: 1px solid var(--blue);
}

.price-btn--solid:hover {
  background: var(--blue-dark);
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.4);
}

/* ── CTA ── */
.cta-section {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 2rem 8rem;
}

.cta-box {
  background: var(--ink);
  border-radius: 20px;
  padding: 4rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta-box::before {
  content: '';
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 300px;
  background: radial-gradient(ellipse, rgba(37, 99, 235, 0.4) 0%, transparent 70%);
  pointer-events: none;
}

.cta-title {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 300;
  letter-spacing: -0.04em;
  color: white;
  margin-bottom: 0.875rem;
  position: relative;
}

.cta-title strong {
  font-weight: 600;
}

.cta-sub {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 2.25rem;
  position: relative;
  max-width: 360px;
  margin-left: auto;
  margin-right: auto;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 0.875rem;
  position: relative;
}

.btn-cta-primary {
  font-family: var(--font);
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--ink);
  background: white;
  border: none;
  border-radius: 10px;
  padding: 0.75rem 1.75rem;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-cta-primary:hover {
  box-shadow: 0 4px 16px rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.btn-cta-outline {
  font-family: var(--font);
  font-size: 0.9375rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  padding: 0.75rem 1.75rem;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.15s;
}

.btn-cta-outline:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

/* ── FOOTER ── */
footer {
  border-top: 1px solid var(--line);
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}

.footer-logo {
  width: 22px;
  height: 22px;
  background: var(--blue);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-logo svg {
  width: 12px;
  height: 12px;
}

.footer-name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--ink);
  letter-spacing: -0.02em;
}

.footer-copy {
  font-size: 0.8125rem;
  color: var(--subtle);
}

/* ── ANIMATIONS ── */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .preview-body {
    grid-template-columns: 1fr;
  }

  .preview-right {
    display: none;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .steps-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .step-item::after {
    display: none;
  }

  .pricing-cards {
    grid-template-columns: 1fr;
  }

  .cta-box {
    padding: 2.5rem 1.5rem;
  }

  .cta-actions {
    flex-direction: column;
  }

  footer {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>