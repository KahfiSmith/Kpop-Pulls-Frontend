import { Idol } from '@/data/idols';
import { RarityType } from '@/data/rarities';

export interface CollectionItem {
  idol: Idol;
  obtainedAt: string; 
  count: number; 
}

export interface Collection {
  items: CollectionItem[];
  lastUpdated: string; 
}

export interface CollectionStats {
  totalCards: number;
  uniqueCards: number;
  byRarity: Record<RarityType, number>;
  byGroup: Record<string, number>;
}

export interface CollectionFilters {
  rarity?: RarityType | 'all';
  group?: string | 'all';
  search?: string;
}

export interface CollectionSortOptions {
  field: 'obtainedAt' | 'rarity' | 'group' | 'name';
  direction: 'asc' | 'desc';
}

export interface CollectionExport {
  collection: Collection;
  exportedAt: string; 
  version: string; 
}

export interface CollectionShareData {
  userId: string;
  collection: Collection;
  sharedAt: string; 
  expiresAt?: string; 
}
