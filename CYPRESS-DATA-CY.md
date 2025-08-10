# Cypress Data-Cy Attributes Guide

Dokumen ini berisi daftar lengkap semua `data-cy` attributes yang telah ditambahkan ke aplikasi KPop Pulls Frontend untuk testing dengan Cypress.

## Home Page (/)

### Navigation
- `home-button` - Button untuk navigasi ke Home page
- `my-collection-button` - Button untuk navigasi ke Collection page

### Gacha System
- `gacha-pull-button` - Button utama untuk melakukan gacha pull
- `continue-button` - Button untuk melanjutkan setelah animasi pull selesai
- `toggle-mute-button` - Button untuk toggle sound on/off
- `toggle-stats-button` - Button untuk show/hide statistics panel

### Statistics Panel
- `stats-panel` - Container untuk statistics panel
- `recent-pulls-table` - Table yang menampilkan recent pulls

## Collection Page (/collection)

### Navigation
- `back-to-home-button` - Button untuk kembali ke Home page

### Collection Management
- `export-collection-button` - Button untuk export collection
- `import-collection-button` - Label/Button untuk import collection file
- `share-collection-button` - Button untuk share collection link
- `clear-collection-button` - Button untuk clear/hapus semua collection

### Filters and Search
- `rarity-filter-select` - Dropdown untuk filter berdasarkan rarity
- `group-filter-select` - Dropdown untuk filter berdasarkan group
- `search-input` - Input field untuk search berdasarkan nama idol

### Sort Options
- `sort-field-select` - Dropdown untuk pilih field sorting (date, rarity, group, name)
- `sort-direction-button` - Button untuk toggle asc/desc sorting

### Collection Grid
- `collection-grid` - Container untuk grid collection items
- `collection-item-{idolId}` - Individual collection item (dinamis berdasarkan idol ID)
- `empty-collection` - Container untuk empty state message

## Component Elements

### Idol Card
- `idol-card` - Container untuk card individual idol
- `view-profile-button` - Button untuk membuka detail modal

### Idol Detail Modal
- `idol-detail-modal` - Container untuk modal detail idol
- `close-modal-button` - Button untuk menutup modal

## Tips Penggunaan untuk Testing

### 1. Basic Navigation Test
```javascript
cy.visit('/');
cy.get('[data-cy="my-collection-button"]').click();
cy.url().should('include', '/collection');
cy.get('[data-cy="back-to-home-button"]').click();
cy.url().should('eq', Cypress.config().baseUrl + '/');
```

### 2. Gacha Pull Test
```javascript
cy.get('[data-cy="gacha-pull-button"]').click();
// Wait for animation to complete
cy.get('[data-cy="continue-button"]', { timeout: 10000 }).should('be.visible').click();
```

### 3. Collection Filter Test
```javascript
cy.get('[data-cy="rarity-filter-select"]').click();
cy.contains('Rising Star').click();
cy.get('[data-cy="collection-grid"]').should('be.visible');
```

### 4. Search Test
```javascript
cy.get('[data-cy="search-input"]').type('Jennie');
cy.get('[data-cy="collection-grid"]').within(() => {
  cy.get('[data-cy^="collection-item-"]').should('have.length.at.least', 0);
});
```

### 5. Modal Test
```javascript
cy.get('[data-cy="collection-grid"]').within(() => {
  cy.get('[data-cy^="collection-item-"]').first().within(() => {
    cy.get('[data-cy="view-profile-button"]').click();
  });
});
cy.get('[data-cy="idol-detail-modal"]').should('be.visible');
cy.get('[data-cy="close-modal-button"]').click();
cy.get('[data-cy="idol-detail-modal"]').should('not.exist');
```

## Best Practices

1. **Konsistensi Naming**: Gunakan kebab-case untuk semua data-cy values
2. **Deskriptif**: Nama harus menjelaskan fungsi element dengan jelas
3. **Unik**: Setiap data-cy harus unik dalam satu halaman
4. **Stabil**: Hindari menggunakan data yang berubah-ubah (seperti index array)
5. **Hierarkis**: Untuk element yang serupa, gunakan prefix yang konsisten

## Update dan Maintenance

Ketika menambah fitur baru:
1. Tambahkan data-cy attribute pada element yang akan ditest
2. Update dokumentasi ini
3. Buat atau update test case yang sesuai
4. Pastikan data-cy tidak bertabrakan dengan yang sudah ada

Ketika mengubah struktur komponen:
1. Pastikan data-cy attributes tetap ada dan konsisten
2. Update test yang terpengaruh
3. Update dokumentasi jika diperlukan
