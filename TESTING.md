# Cypress Testing Setup untuk KPop Pulls

Setup ini menyediakan comprehensive testing untuk aplikasi KPop Pulls menggunakan Cypress.

## 📁 Struktur Testing

```
cypress/
├── e2e/                    # End-to-end tests
│   ├── home.cy.ts         # Testing halaman home
│   ├── gacha.cy.ts        # Testing gacha system
│   ├── collection.cy.ts   # Testing collection page
│   └── localStorage.cy.ts # Testing local storage functionality
├── fixtures/              # Test data
│   └── test-idol.json     # Sample idol data
├── support/               # Support files
│   ├── e2e.ts            # E2E support configuration
│   ├── component.ts       # Component testing support
│   └── commands.ts        # Custom Cypress commands
└── cypress.config.ts      # Cypress configuration
```

## 🚀 Cara Menjalankan Testing

### Prerequisites
Pastikan aplikasi Next.js sudah berjalan di `http://localhost:3000`:
```bash
pnpm dev
```

### Menjalankan Testing

#### 1. Interactive Mode (Recommended untuk Development)
```bash
pnpm cypress:open
# atau
pnpm test:e2e:dev
```

#### 2. Headless Mode (untuk CI/CD)
```bash
pnpm cypress:run
# atau
pnpm test:e2e
```

#### 3. Headless Mode dengan Video Recording Off
```bash
pnpm cypress:run:headless
```

## 🧪 Jenis Testing yang Tersedia

### 1. Home Page Testing (`home.cy.ts`)
- ✅ Verifikasi halaman home loading dengan benar
- ✅ Memastikan gacha machine visible
- ✅ Testing navigasi ke collection

### 2. Gacha System Testing (`gacha.cy.ts`)
- ✅ Testing gacha pull functionality
- ✅ Verifikasi idol card muncul setelah pull
- ✅ Testing sound effects (mocked)
- ✅ Testing idol detail modal
- ✅ Testing multiple pulls
- ✅ Verifikasi rarity system

### 3. Collection Testing (`collection.cy.ts`)
- ✅ Testing collection page display
- ✅ Testing empty state
- ✅ Verifikasi collected idols ditampilkan
- ✅ Testing filter functionality
- ✅ Testing idol details dari collection
- ✅ Testing shared collection

### 4. Local Storage Testing (`localStorage.cy.ts`)
- ✅ Verifikasi idol tersimpan ke localStorage
- ✅ Testing persistence across page reloads
- ✅ Testing localStorage quota handling

## 🛠️ Custom Commands

Cypress commands yang sudah dibuat untuk memudahkan testing:

```typescript
// Select element by data-cy attribute
cy.getByCy('element-name')

// Click gacha pull button
cy.pullGacha()

// Wait for animations
cy.waitForAnimation(1000) // default 1000ms
```

## 📋 Data Attributes untuk Testing

Untuk testing yang optimal, pastikan komponen-komponen berikut memiliki `data-cy` attributes:

### Gacha System:
- `data-cy="gacha-pull-button"` - Tombol pull gacha
- `data-cy="idol-card"` - Card idol yang muncul
- `data-cy="idol-name"` - Nama idol
- `data-cy="idol-rarity"` - Rarity badge
- `data-cy="idol-detail-modal"` - Modal detail idol

### Collection:
- `data-cy="collection-container"` - Container utama collection
- `data-cy="empty-collection"` - Empty state message
- `data-cy="collected-idol"` - Individual collected idol
- `data-cy="collection-filter"` - Filter controls
- `data-cy="group-filter"` - Group filter
- `data-cy="rarity-filter"` - Rarity filter

### Idol Detail Modal:
- `data-cy="idol-detail-name"` - Nama idol di modal
- `data-cy="idol-detail-group"` - Group idol di modal
- `data-cy="idol-detail-rarity"` - Rarity di modal

## ⚙️ Konfigurasi

### Cypress Configuration (`cypress.config.ts`)
- Base URL: `http://localhost:3000`
- Viewport: 1280x720
- Video recording: Disabled (untuk performa)
- Screenshot on failure: Enabled

### Environment Variables
Jika diperlukan, Anda bisa menambahkan environment variables di `cypress.config.ts`:

```typescript
env: {
  apiUrl: 'http://localhost:3000/api',
  // tambahkan environment variables lain sesuai kebutuhan
}
```

## 🚨 Tips untuk Testing

### 1. Data Attributes
Selalu gunakan `data-cy` attributes untuk element selection:
```jsx
<button data-cy="gacha-pull-button">Pull!</button>
```

### 2. Waiting for Animations
Gunakan `cy.waitForAnimation()` setelah operasi yang memiliki animasi:
```typescript
cy.pullGacha()
cy.waitForAnimation(3000) // wait for gacha animation
```

### 3. Audio Testing
Audio di-mock untuk testing:
```typescript
cy.window().then((win) => {
  cy.stub(win.HTMLMediaElement.prototype, 'play').returns(Promise.resolve())
})
```

### 4. localStorage Testing
Clear localStorage sebelum testing untuk konsistensi:
```typescript
beforeEach(() => {
  cy.clearLocalStorage()
})
```

## 🔧 Troubleshooting

### Error: "Timed out retrying"
- Pastikan aplikasi Next.js berjalan di port 3000
- Periksa apakah element memiliki `data-cy` attribute yang benar
- Increase timeout jika diperlukan: `cy.get('[data-cy=element]', { timeout: 10000 })`

### Error: "Element not visible"
- Pastikan element tidak ter-cover oleh element lain
- Periksa apakah ada animasi yang belum selesai
- Gunakan `cy.waitForAnimation()` jika diperlukan

### Error: "Audio play() failed"
- Normal untuk testing environment
- Audio di-mock di support files

## 📈 Next Steps

1. **Tambahkan data-cy attributes** ke komponen yang belum ada
2. **Jalankan tests** dan perbaiki yang gagal
3. **Tambahkan more test cases** sesuai kebutuhan
4. **Setup CI/CD** untuk automated testing
5. **Add visual regression testing** jika diperlukan

## 🤝 Contributing

Saat menambah fitur baru:
1. Tambahkan `data-cy` attributes ke komponen baru
2. Buat test cases yang sesuai
3. Update dokumentasi ini jika diperlukan

---

Happy Testing! 🎯
