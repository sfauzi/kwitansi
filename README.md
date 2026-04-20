<div align="center">
  <br />
  <img width="142" height="49" alt="image" src="https://github.com/user-attachments/assets/a49ff70e-9872-4707-bd5c-f8c7ab77faa2" />
  <h1>Kwitansi</h1>
  <p>Invoice generator modern untuk UMKM Indonesia.<br/>Buat, pratinjau, dan unduh invoice profesional dalam hitungan detik.</p>

  <p>
    <a href="https://kwitansi.id">
      <img src="https://img.shields.io/badge/Live-kwitansi.id-2563EB?style=flat-square&logo=vercel&logoColor=white" alt="Live Demo" />
    </a>
    <img src="https://img.shields.io/badge/Nuxt-v4-00DC82?style=flat-square&logo=nuxt.js&logoColor=white" alt="Nuxt v4" />
    <img src="https://img.shields.io/badge/Supabase-latest-3ECF8E?style=flat-square&logo=supabase&logoColor=white" alt="Supabase" />
    <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License" />
  </p>

  <br />
</div>

---

## 🌐 Live Demo
Akses langsung website: 👉 https://kwitansi-one.vercel.app

## 📸 Screenshot

<details>
<img width="full" height="full" alt="screencapture-kwitansi-one-vercel-app-2026-04-20-14_12_26" src="https://github.com/user-attachments/assets/9b280a2e-57da-46b3-969b-a590916d7e9a" />

<img width="1318" height="1917" alt="screencapture-kwitansi-one-vercel-app-guest-2026-04-20-14_14_25" src="https://github.com/user-attachments/assets/ab95c683-3166-4224-a0ab-994862a21b41" />

<img width="1318" height="1917" alt="screencapture-kwitansi-one-vercel-app-guest-2026-04-20-14_14_43" src="https://github.com/user-attachments/assets/56497f63-4b47-4b3b-a953-8461f1b17f42" />

<img width="1318" height="1917" alt="screencapture-kwitansi-one-vercel-app-guest-2026-04-20-14_14_54" src="https://github.com/user-attachments/assets/d32c48ae-c1e0-4c7a-86a5-d2ac611b5721" />

</details>



---

## ✨ Fitur

- **3 Template Profesional** — Modern, Classic, Minimal dengan warna aksen custom
- **Real-time Preview** — Pratinjau invoice langsung saat mengetik
- **Ekspor PDF** — Unduh PDF siap kirim dalam satu klik
- **Diskon & Pajak Otomatis** — Persen atau nominal, PPN dihitung otomatis
- **Riwayat Invoice** — Simpan, duplikasi, dan kelola invoice lama
- **Auth dengan Supabase** — Login email/password + Google OAuth
- **Data Persisten** — Semua invoice tersimpan aman di Supabase

---

## 🛠 Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | [Nuxt 4](https://nuxt.com) + [Vue 3](https://vuejs.org) |
| Styling | CSS Scoped + [Tailwind CSS v4](https://tailwindcss.com) |
| Backend & Auth | [Supabase](https://supabase.com) |
| State Management | [Pinia](https://pinia.vuejs.org) |
| PDF Generation | [jsPDF](https://github.com/parallax/jsPDF) + [html2canvas](https://html2canvas.hertzen.com) |
| Deployment | [Vercel](https://vercel.com) |

---

## 🚀 Memulai

### Prasyarat

Pastikan sudah terinstall:

- **Node.js** `>= 20.x`
- **pnpm** `>= 9.x` _(direkomendasikan)_
- Akun [Supabase](https://supabase.com)

### 1. Clone & Install

```bash
git clone https://github.com/username/kwitansi.git
cd kwitansi
pnpm install
```

### 2. Setup Environment

Salin file environment dan isi variabelnya:

```bash
cp .env.example .env
```

```env
# .env

# Supabase
SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here

# App
NUXT_PUBLIC_APP_URL=http://localhost:3000
```

> Temukan `SUPABASE_URL` dan `SUPABASE_ANON_KEY` di **Supabase Dashboard → Project Settings → API**.


---

---

## ⚙️ Konfigurasi Nuxt

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: { compatibilityVersion: 4 },

  modules: [
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],

  supabase: {
    redirect: false, // atur manual di middleware
  },

  runtimeConfig: {
    public: {
      appUrl: process.env.NUXT_PUBLIC_APP_URL,
    },
  },

  css: ['~/assets/css/kwitansi.css'],
})
```

---

---

## 🌐 Deployment

### Vercel _(direkomendasikan)_

1. Push repo ke GitHub
2. Import project di [vercel.com](https://vercel.com)
3. Tambahkan environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `NUXT_PUBLIC_APP_URL`
4. Deploy


---

## 🤝 Kontribusi

Pull request dan issue sangat disambut!

1. Fork repo ini
2. Buat branch baru: `git checkout -b feat/nama-fitur`
3. Commit perubahan: `git commit -m 'feat: tambah fitur X'`
4. Push branch: `git push origin feat/nama-fitur`
5. Buka Pull Request
