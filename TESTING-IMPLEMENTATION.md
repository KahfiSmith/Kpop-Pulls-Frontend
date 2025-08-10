# Contoh Implementasi Data-Cy Attributes

Berikut adalah contoh bagaimana menambahkan `data-cy` attributes ke komponen-komponen utama untuk mendukung Cypress testing:

## 1. GachaPull Component

```tsx
// src/components/features/HomePage/GachaPull.tsx

export const GachaPull: React.FC = () => {
  // ... existing code ...

  return (
    <div className="w-full max-w-4xl mx-auto" data-cy="gacha-container">
      <div className="bg-retro-cream border-3 border-retro-brown rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-retro-brown mb-4 text-center">
          Idol Gacha
        </h2>

        <div className="relative h-96 w-full bg-retro-navy border-3 border-retro-brown rounded-lg mb-6 overflow-hidden">
          {animation.isPlaying ? (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* ... animation steps ... */}
              
              {animation.step === "reveal" && animation.result && (
                <div className="animate-fadeIn" data-cy="idol-card">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="transform scale-110 animate-scaleIn">
                      {animation.result.idol.image && (
                        <div className="relative">
                          <OptimizedImage
                            src={animation.result.idol.image}
                            alt={animation.result.idol.name}
                            width={300}
                            height={300}
                            className="rounded-lg border-4 border-retro-brown shadow-lg h-full w-full object-cover"
                            data-cy="idol-image"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <img
                src="/images/gacha-machine.png"
                alt="Gacha Machine"
                width={170}
                height={170}
                data-cy="gacha-machine-image"
              />
              <Button
                onClick={handlePull}
                data-cy="gacha-pull-button"
                className="bg-retro-yellow hover:bg-retro-orange..."
              >
                Pull Card
              </Button>
            </div>
          )}
        </div>

        {/* Stats and controls */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Button
            onClick={toggleMute}
            data-cy="mute-toggle-button"
            className="..."
          >
            {isMuted ? "🔇" : "🔊"}
          </Button>
          
          <Button
            onClick={() => setShowStats(!showStats)}
            data-cy="stats-toggle-button"
            className="..."
          >
            {showStats ? "Hide Stats" : "Show Stats"}
          </Button>
        </div>
      </div>
    </div>
  )
}
```

## 2. IdolCard Component

```tsx
// src/components/features/HomePage/IdolCard.tsx

interface IdolCardProps {
  idol: Idol
  onClick?: () => void
}

export const IdolCard: React.FC<IdolCardProps> = ({ idol, onClick }) => {
  return (
    <div 
      className="..."
      data-cy="idol-card"
      onClick={onClick}
    >
      <OptimizedImage
        src={idol.image}
        alt={idol.name}
        data-cy="idol-image"
        className="..."
      />
      
      <div className="p-4">
        <h3 data-cy="idol-name" className="...">
          {idol.name}
        </h3>
        
        <p data-cy="idol-group" className="...">
          {idol.group}
        </p>
        
        <span 
          data-cy="idol-rarity"
          className={`... ${rarities[idol.rarity].bgColor}`}
        >
          {rarities[idol.rarity].name}
        </span>
      </div>
    </div>
  )
}
```

## 3. IdolDetailModal Component

```tsx
// src/components/features/Collection/IdolDetailModal.tsx

export const IdolDetailModal: React.FC<IdolDetailModalProps> = ({ 
  idol, 
  isOpen, 
  onClose 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="..."
        data-cy="idol-detail-modal"
      >
        <div className="...">
          <OptimizedImage
            src={idol.image}
            alt={idol.name}
            data-cy="idol-detail-image"
            className="..."
          />
          
          <div className="...">
            <h2 data-cy="idol-detail-name" className="...">
              {idol.name}
            </h2>
            
            <p data-cy="idol-detail-group" className="...">
              Group: {idol.group}
            </p>
            
            <span 
              data-cy="idol-detail-rarity"
              className={`... ${rarities[idol.rarity].bgColor}`}
            >
              {rarities[idol.rarity].name}
            </span>
            
            <Button
              onClick={onClose}
              data-cy="modal-close-button"
              className="..."
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

## 4. Collection Page

```tsx
// src/app/collection/page.tsx

export default function CollectionPage() {
  return (
    <div className="..." data-cy="collection-container">
      <h1 className="...">My Collection</h1>
      
      {/* Filters */}
      <div className="..." data-cy="collection-filters">
        <Select data-cy="group-filter">
          <SelectTrigger>
            <SelectValue placeholder="Filter by Group" />
          </SelectTrigger>
          <SelectContent>
            {/* options */}
          </SelectContent>
        </Select>
        
        <Select data-cy="rarity-filter">
          <SelectTrigger>
            <SelectValue placeholder="Filter by Rarity" />
          </SelectTrigger>
          <SelectContent>
            {/* options */}
          </SelectContent>
        </Select>
      </div>

      {/* Collection Grid */}
      {collection.length === 0 ? (
        <div data-cy="empty-collection" className="...">
          <p>No idols collected yet!</p>
          <Link href="/" data-cy="go-to-gacha-button">
            Start pulling cards!
          </Link>
        </div>
      ) : (
        <div className="..." data-cy="collection-grid">
          {collection.map((idol, index) => (
            <div
              key={`${idol.id}-${index}`}
              data-cy="collected-idol"
              onClick={() => setSelectedIdol(idol)}
            >
              <IdolCard idol={idol} />
            </div>
          ))}
        </div>
      )}

      {/* Share Collection Button */}
      <Button
        data-cy="share-collection-button"
        onClick={() => router.push('/collection/shared')}
        className="..."
      >
        Share Collection
      </Button>
    </div>
  )
}
```

## 5. Navigation Components

```tsx
// src/components/common/Navigation.tsx

export const Navigation: React.FC = () => {
  return (
    <nav className="..." data-cy="main-navigation">
      <Link 
        href="/" 
        data-cy="home-nav-link"
        className="..."
      >
        Home
      </Link>
      
      <Link 
        href="/collection" 
        data-cy="collection-nav-link"
        className="..."
      >
        Collection
      </Link>
    </nav>
  )
}
```

## 6. Audio Components

```tsx
// Jika ada komponen audio terpisah
export const AudioPlayer: React.FC = () => {
  return (
    <audio
      ref={audioRef}
      data-cy="audio-player"
      preload="none"
    >
      <source src={currentTrack} type="audio/mpeg" />
    </audio>
  )
}
```

## Panduan Penamaan Data-Cy

### Konvensi Penamaan:
1. **Kebab-case**: Gunakan kebab-case untuk konsistensi
2. **Descriptive**: Nama harus menjelaskan fungsi/tujuan element
3. **Hierarchical**: Gunakan prefix untuk grouping yang jelas

### Contoh Pattern:
- `gacha-pull-button` - Tombol untuk pull gacha
- `idol-card` - Card individual idol
- `idol-detail-modal` - Modal detail idol
- `collection-container` - Container utama collection
- `collection-filter` - Filter controls
- `stats-toggle-button` - Tombol toggle statistics

### Tips:
- Hindari ID atau class sebagai selector di tests
- `data-cy` attributes khusus untuk testing
- Jangan gunakan `data-cy` untuk styling
- Update documentation ketika menambah attributes baru

---

Implementasi attributes ini akan membuat semua Cypress tests berjalan dengan lancar dan lebih maintainable!
