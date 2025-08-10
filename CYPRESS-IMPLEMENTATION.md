# 🎯 Implementation Guide: Menambah Data-Cy Attributes

Untuk testing Cypress berfungsi optimal, Anda perlu menambahkan `data-cy` attributes pada komponen-komponen key. Berikut adalah guide implementasi berdasarkan analisis kode Anda:

## 📋 **Priority 1: GachaPull Component - CRITICAL**

### **1. Pull Button (Line ~140 di GachaPull.tsx)**
```tsx
// BEFORE:
<Button
  onClick={handlePull}
  className="bg-retro-yellow hover:bg-retro-orange..."
>
  Pull Card
</Button>

// AFTER:
<Button
  data-cy="gacha-pull-button"    // ← ADD THIS
  onClick={handlePull}
  className="bg-retro-yellow hover:bg-retro-orange..."
>
  Pull Card
</Button>
```

### **2. Gacha Machine Image (Line ~125)**
```tsx
// BEFORE:
<img
  src="/images/gacha-machine.png"
  alt="Gacha Machine"
  width={170}
  height={170}
/>

// AFTER:
<img
  data-cy="gacha-machine"       // ← ADD THIS
  src="/images/gacha-machine.png"
  alt="Gacha Machine"
  width={170}
  height={170}
/>
```

### **3. Animation States**
```tsx
// Pulling State (Line ~60):
<div data-cy="gacha-pulling" className="animate-pulse flex flex-col items-center">

// Reveal State (Line ~75):
<div data-cy="gacha-reveal" className="animate-fadeIn">

// Complete State (Line ~100):  
<div data-cy="gacha-complete" className="flex flex-col items-center animate-fadeIn">
```

## 📋 **Priority 2: IdolCard Component**

### **File: `src/components/features/HomePage/IdolCard.tsx`**

```tsx
// Main container (Line ~27):
<div data-cy="idol-card" className="relative w-72">

// Idol name (Line ~68):
<h3 data-cy="idol-name" className="text-base font-bold text-retro-brown">
  {name}
</h3>

// Rarity badge (Line ~73):
<div data-cy="idol-rarity" className={`${rarityStyles.bgColor} px-2 py-0.5...`}>
  {rarities[rarity as RarityType].name}
</div>

// Group name (Line ~43):
<div data-cy="idol-group" className="ml-2 text-retro-brown text-sm font-medium">
  {group}
</div>
```

## 📋 **Priority 3: Collection Page**

### **File: `src/app/collection/page.tsx`**

```tsx
// Main container:
<div data-cy="collection-container" className="min-h-screen bg-retro-cream">

// Empty state:
{collection.items.length === 0 ? (
  <div data-cy="empty-collection" className="text-center py-12">

// Individual collected idols:
{filteredAndSortedItems.map((item, index) => (
  <div key={`${item.idol.id}-${index}`} data-cy="collected-idol">
    <IdolCard ...>
  </div>
))}
```

## ⚡ **Quick Implementation Steps**

1. **Start with GachaPull.tsx** - Add `data-cy="gacha-pull-button"`
2. **Test immediately** - `pnpm cypress:open` 
3. **Add IdolCard attributes** - `data-cy="idol-card"`, `data-cy="idol-name"`
4. **Test again** - See more tests pass
5. **Continue iteratively**

Dengan implementasi ini, 90% test cases akan berjalan dengan baik! 🎯
