import { Idol } from '@/data/idols';
import { RarityType } from '@/data/rarities';

export interface IdolCardProps {
  name: string;
  group: string;
  birthdate: string;
  birthplace: string;
  position: string;
  quote: string;
  imageSrc: string;
  rarity?: RarityType;
  onViewProfile?: () => void;
  countBadge?: number; // optional count badge displayed on top-right corner
}

export interface IdolDetailProps {
  idol: Idol;
  onClose: () => void;
}
