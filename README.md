<div align="center">

# KPopPulls — Frontend

Koleksi kartu idol K‑Pop dengan mekanik gacha, pity system, dan manajemen koleksi lokal.

</div>

## ✨ Fitur

- Gacha dengan rarity dan pity system (Rookie → Ultimate Bias).
- Animasi reveal + efek suara untuk pull tertentu.
- Statistik pull (distribusi rarity, total pulls, pity pulls).
- Manajemen koleksi berbasis localStorage (tambah duplikat otomatis).
- Ekspor/Impor koleksi (JSON) dan tautan share koleksi (encoded di URL).
- UI retro dengan Tailwind CSS, Radix UI, dan ikon lucide.

## 🧱 Teknologi

- Next.js 15 (App Router, Turbopack) + React 19 + TypeScript.
- Tailwind CSS v4, `class-variance-authority`, `tailwind-merge`, `clsx`.
- Radix UI (`@radix-ui/react-dialog`, `-label`, `-select`, `-toast`).
- Animasi: `framer-motion`, `tw-animate-css`.
- E2E Testing: Cypress 14.

Lihat `package.json` untuk versi lengkap dependensi.

## 📦 Struktur Proyek (ringkas)

```
src/
  app/                 # App Router (home, collection)
  components/          # UI dan fitur (GachaPull, modals, dsb.)
  data/                # Data statis: idols, groups, rarities
  hooks/               # Hooks: useGacha, useAudio, useLocalStorage
  lib/                 # Utils
  types/               # TypeScript types (gacha, collection)
public/
  images/              # Gambar idol & aset UI
  sounds/              # SFX reveal / pull
```

## 🧩 Data & Tipe

- `src/data/idols.ts` — daftar idol dengan schema:
  ```ts
  interface Idol {
    id: string;           // unik, ex: "twice-sana"
    name: string;         // nama asli
    stageName: string;    // nama panggung
    group: string;        // harus cocok dengan groups.ts
    birthdate: string;
    birthplace: string;
    position: string;
    quote: string;
    rarity: RarityType;   // 'common' | 'rare' | 'epic' | 'legendary' | 'mythical'
    image: string;        // path relatif ke /public/images
  }
  ```
- `src/data/rarities.ts` — definisi rarity, warna, dan probabilitas + `pityConfig`.
- `src/data/groups.ts` — daftar grup (id, nama, debutYear, company, jumlah member).

Catatan:
- Nilai `group` di idols.ts harus konsisten dengan `groups.ts` (contoh: "Aespa").
- Beberapa aset gambar bernama sama mungkin dipakai oleh idol berbeda berdasarkan nama panggung; sesuaikan file gambar bila perlu.

## 🚀 Menjalankan Secara Lokal

Prasyarat:
- Node.js 18+ (disarankan LTS terbaru)
- pnpm 9+ (atau gunakan npm/yarn sesuai preferensi)

Instal dependensi:
```bash
pnpm install
```

Jalankan pengembangan (dev server di http://localhost:3000):
```bash
pnpm dev
```

Build produksi dan start:
```bash
pnpm build
pnpm start
```

Pemeriksaan tipe & lint:
```bash
pnpm type-check
pnpm lint
```

## 🧪 Testing (Cypress)

Jalankan E2E secara headless:
```bash
pnpm cypress:run
```

Buka UI Cypress:
```bash
pnpm cypress:open
```

Data‑cy attribute tersedia di berbagai komponen untuk seleksi yang stabil.

## 🛠️ Catatan Implementasi

- State koleksi, histori pull, dan pity disimpan di `localStorage` agar persisten di browser.
- Pity system dikontrol oleh `pityConfig` di `src/data/rarities.ts`.
- Fitur ekspor/impor koleksi menggunakan file JSON; fitur share membuat tautan berisi payload koleksi yang di‑encode (berlaku sementara sesuai timestamp).
- Efek suara dapat di‑mute/unmute di UI; beberapa rarity dapat memiliki `soundEffect` khusus (opsional) di `rarities.ts`.

## 🧭 Rencana Pengembangan (opsional)

- Filter koleksi (berdasarkan grup/rarity) dan pencarian.
- Sinkronisasi koleksi lintas perangkat (backend ringan / Supabase).
- Halaman detail grup/idol terdedikasi.

## 🤝 Kontribusi

Kontribusi sangat diterima. Harap ikuti langkah berikut:
- Fork dan buat branch fitur/bugfix.
- Jalankan `pnpm type-check` dan `pnpm lint` sebelum membuat PR.
- Sertakan deskripsi perubahan dan langkah uji.

---

Jika menemukan kesalahan data (idol/grup/rarity), silakan buat issue atau PR. Terima kasih! 🙌
