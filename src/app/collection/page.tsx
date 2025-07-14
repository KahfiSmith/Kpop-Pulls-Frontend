'use client';

import { IdolCard, IdolDetailModal } from '@/components/features';
import { Button, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, ConfirmationDialog } from '@/components/ui';
import { groups } from '@/data/groups';
import { Idol } from '@/data/idols';
import { rarities, RarityType } from '@/data/rarities';
import { useGacha } from '@/hooks';
import { CollectionFilters, CollectionSortOptions } from '@/types';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CollectionPage() {
  const { collection, exportCollection, importCollection, clearCollection, copyShareLink } = useGacha();
  
  const [filters, setFilters] = useState<CollectionFilters>({
    rarity: 'all',
    group: 'all',
    search: ''
  });
  
  const [sortOption, setSortOption] = useState<CollectionSortOptions>({
    field: 'obtainedAt',
    direction: 'desc'
  });
  
  const [selectedIdol, setSelectedIdol] = useState<Idol | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareSuccess, setShareSuccess] = useState<boolean | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    try {
      const text = await file.text();
      const success = importCollection(text);
      
      if (success) {
        setImportError(null);
      } else {
        setImportError('Invalid collection file format');
      }
    } catch (error) {
      console.error('Error importing file:', error);
      setImportError('Error reading file');
    }
    
    event.target.value = '';
  };
  
  const openIdolDetails = (idol: Idol) => {
    setSelectedIdol(idol);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const handleShare = async () => {
    const success = await copyShareLink();
    setShareSuccess(success);
    
    if (success) {
      setTimeout(() => {
        setShareSuccess(null);
      }, 3000);
    }
  };
  
  const handleClearCollection = () => {
    setIsConfirmDialogOpen(true);
  };

  const confirmClearCollection = () => {
    clearCollection();
  };
  
  const filteredAndSortedItems = isClient ? collection.items
    .filter(item => {
      if (filters.rarity !== 'all' && item.idol.rarity !== filters.rarity) {
        return false;
      }
      
      if (filters.group !== 'all' && item.idol.group !== filters.group) {
        return false;
      }
      
      if (filters.search && !item.idol.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortOption.field) {
        case 'obtainedAt':
          return sortOption.direction === 'desc'
            ? new Date(b.obtainedAt).getTime() - new Date(a.obtainedAt).getTime()
            : new Date(a.obtainedAt).getTime() - new Date(b.obtainedAt).getTime();
        
        case 'rarity': {
          const rarityOrder: Record<RarityType, number> = {
            mythical: 5,
            legendary: 4,
            epic: 3,
            rare: 2,
            common: 1
          };
          
          const diff = rarityOrder[b.idol.rarity] - rarityOrder[a.idol.rarity];
          return sortOption.direction === 'desc' ? diff : -diff;
        }
        
        case 'group':
          return sortOption.direction === 'desc'
            ? b.idol.group.localeCompare(a.idol.group)
            : a.idol.group.localeCompare(b.idol.group);
        
        case 'name':
          return sortOption.direction === 'desc'
            ? b.idol.name.localeCompare(a.idol.name)
            : a.idol.name.localeCompare(b.idol.name);
        
        default:
          return 0;
      }
    }) : [];
  
  const totalCards = isClient ? collection.items.reduce((sum, item) => sum + item.count, 0) : 0;
  const uniqueCards = isClient ? collection.items.length : 0;
  
  if (!isClient) {
    return <div className="min-h-screen bg-retro-cream p-8"></div>;
  }
  
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-retro-cream p-8 font-[family-name:var(--font-geist-sans)]">
      <header className="py-6 text-center">
        <h1 className="text-3xl font-medium text-retro-brown mb-2 font-bungee">My Idol Collection</h1>
        <p className="text-retro-navy">Manage and showcase your idol cards</p>
        <div className="mt-4">
          <Link href="/">
            <Button className="bg-retro-navy hover:bg-retro-teal text-white font-medium py-1.5 px-3 rounded-md border-2 border-retro-brown transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(0,128,128,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(0,128,128,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] text-sm">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </header>
      
      <main className="flex flex-col items-center py-8">
        <div className="w-full max-w-7xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center bg-retro-mint p-4 rounded-lg border-3 border-retro-brown">
            <div className="mb-4 md:mb-0">
              <p className="text-retro-brown font-bold">Collection Stats:</p>
              <p className="text-retro-navy">
                {totalCards} total cards ({uniqueCards} unique)
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                onClick={exportCollection}
                className="bg-retro-yellow hover:bg-retro-orange text-retro-brown font-medium py-1.5 px-3 rounded-md border-2 border-retro-brown transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(71,42,14,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(71,42,14,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] text-sm"
              >
                Export Collection
              </Button>
              
              <Label htmlFor="import-collection" className="bg-retro-teal hover:bg-retro-navy text-white font-medium py-1.5 px-3 rounded-md border-2 border-retro-brown transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(71,42,14,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(71,42,14,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] text-sm cursor-pointer">
                Import Collection
                <input 
                  id="import-collection"
                  type="file" 
                  accept=".json" 
                  onChange={handleImport} 
                  className="hidden" 
                />
              </Label>
              
              <Button 
                onClick={handleShare}
                className="bg-retro-sage hover:bg-retro-teal text-retro-brown font-medium py-1.5 px-3 rounded-md border-2 border-retro-brown transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(71,42,14,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(71,42,14,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] text-sm"
              >
                Share Collection
              </Button>
              
              <Button 
                onClick={handleClearCollection}
                className="bg-retro-coral hover:bg-retro-burgundy text-white font-medium py-1.5 px-3 rounded-md border-2 border-retro-brown transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(71,42,14,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(71,42,14,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] text-sm"
              >
                Clear Collection
              </Button>
            </div>
          </div>
          
          {shareSuccess !== null && (
            <div className={`mt-2 p-2 ${shareSuccess ? 'bg-retro-sage' : 'bg-retro-coral'} text-white rounded-md text-center`}>
              {shareSuccess 
                ? 'Share link copied to clipboard! You can now share your collection with others.' 
                : 'Failed to copy share link. Please try again.'}
            </div>
          )}
          
          {importError && (
            <div className="mt-2 p-2 bg-retro-coral text-white rounded-md">
              {importError}
            </div>
          )}
        </div>
        
        <div className="w-full max-w-7xl mx-auto mb-8">
          <div className="bg-retro-cream p-4 rounded-lg border-3 border-retro-brown">
            <h2 className="text-xl font-bold text-retro-brown mb-4">Filters</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="rarity-filter" className="block text-retro-brown font-medium mb-2">
                  Rarity
                </Label>
                <Select 
                  value={filters.rarity} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, rarity: value as RarityType | 'all' }))}
                >
                  <SelectTrigger id="rarity-filter" className="w-full px-3 py-2 bg-white border-2 border-retro-brown rounded-md focus:outline-none focus:ring-2 focus:ring-retro-yellow">
                    <SelectValue placeholder="Select rarity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Rarities</SelectItem>
                    {Object.values(rarities).map((rarity) => (
                      <SelectItem key={rarity.id} value={rarity.id}>
                        {rarity.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="group-filter" className="block text-retro-brown font-medium mb-2">
                  Group
                </Label>
                <Select 
                  value={filters.group} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, group: value }))}
                >
                  <SelectTrigger id="group-filter" className="w-full px-3 py-2 bg-white border-2 border-retro-brown rounded-md focus:outline-none focus:ring-2 focus:ring-retro-yellow">
                    <SelectValue placeholder="Select group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Groups</SelectItem>
                    {groups.map((group) => (
                      <SelectItem key={group.id} value={group.name}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="search-filter" className="block text-retro-brown font-medium mb-2">
                  Search
                </Label>
                <input
                  id="search-filter"
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  placeholder="Search by name..."
                  className="w-full px-3 py-2 bg-white border-2 border-retro-brown rounded-md focus:outline-none focus:ring-2 focus:ring-retro-yellow"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <Label htmlFor="sort-options" className="block text-retro-brown font-medium mb-2">
                Sort By
              </Label>
              <div className="flex gap-2">
                <Select 
                  value={sortOption.field} 
                  onValueChange={(value) => setSortOption(prev => ({ ...prev, field: value as CollectionSortOptions['field'] }))}
                >
                  <SelectTrigger id="sort-options" className="px-3 py-2 bg-white border-2 border-retro-brown rounded-md focus:outline-none focus:ring-2 focus:ring-retro-yellow">
                    <SelectValue placeholder="Select sort field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="obtainedAt">Date Obtained</SelectItem>
                    <SelectItem value="rarity">Rarity</SelectItem>
                    <SelectItem value="group">Group</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button
                  onClick={() => setSortOption(prev => ({ 
                    ...prev, 
                    direction: prev.direction === 'asc' ? 'desc' : 'asc' 
                  }))}
                  className="bg-retro-sage hover:bg-retro-teal text-retro-brown font-medium py-1.5 px-3 rounded-md border-2 border-retro-brown transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(71,42,14,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(71,42,14,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] text-sm"
                >
                  {sortOption.direction === 'asc' ? '↑ Ascending' : '↓ Descending'}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-retro-brown mb-6">
            {filteredAndSortedItems.length > 0 
              ? `Your Collection (${filteredAndSortedItems.length} cards)` 
              : 'Your Collection is Empty'}
          </h2>
          
          {filteredAndSortedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {filteredAndSortedItems.map((item) => (
                <div key={item.idol.id} className="relative">
                  <div className="absolute -top-2 -right-2 bg-retro-brown text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold z-10">
                    {item.count}
                  </div>
                  <IdolCard
                    name={item.idol.name}
                    group={item.idol.group}
                    birthdate={item.idol.birthdate}
                    birthplace={item.idol.birthplace}
                    position={item.idol.position}
                    quote={item.idol.quote}
                    imageSrc={item.idol.image}
                    rarity={item.idol.rarity}
                    onViewProfile={() => openIdolDetails(item.idol)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-retro-navy text-lg">
                No cards match your filters or your collection is empty.
              </p>
              <p className="text-retro-navy mt-2">
                Try adjusting your filters or pull some cards!
              </p>
            </div>
          )}
        </div>
      </main>
      
      <footer className="py-6 text-center text-retro-brown">
        <p>© 2024 KPop Pulls Collection</p>
      </footer>
      
      <IdolDetailModal
        idol={selectedIdol}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
        title="Clear Collection"
        description="Are you sure you want to clear your collection? This action cannot be undone."
        onConfirm={confirmClearCollection}
        confirmText="Yes, Clear Collection"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
}
