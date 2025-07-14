import { Button } from '@/components/ui';
import { Idol } from '@/data/idols';
import { rarities } from '@/data/rarities';
import Image from 'next/image';
import React, { useEffect } from 'react';

interface IdolDetailModalProps {
  idol: Idol | null;
  onClose: () => void;
  isOpen: boolean;
}

export const IdolDetailModal: React.FC<IdolDetailModalProps> = ({ idol, onClose, isOpen }) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !idol) {
    return null;
  }

  const rarityInfo = rarities[idol.rarity];

  return (
    <div 
      className="fixed inset-0 bg-retro-cream bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-retro-cream rounded-lg border-3 border-retro-brown max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-xl">
        <div className="bg-retro-yellow p-4 flex items-center border-b-3 border-retro-brown">
          <h2 className="text-xl font-bold text-retro-brown">{idol.name}</h2>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative h-96 w-full rounded-lg overflow-hidden border-3 border-retro-brown">
              <Image
                src={idol.image}
                alt={`${idol.name} from ${idol.group}`}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="bg-white p-4 rounded-lg border-3 border-retro-brown">
              <h3 className="text-lg font-bold text-retro-brown mb-4">Idol Information</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium text-retro-brown">{idol.name}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Stage Name</p>
                  <p className="font-medium text-retro-brown">{idol.stageName}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Group</p>
                  <p className="font-medium text-retro-brown">{idol.group}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Rarity</p>
                  <div className="flex items-center">
                    <p className="font-medium text-retro-brown mr-2">{rarityInfo.name}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Birthdate</p>
                  <p className="font-medium text-retro-brown">{idol.birthdate}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Birthplace</p>
                  <p className="font-medium text-retro-brown">{idol.birthplace}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Position</p>
                  <p className="font-medium text-retro-brown">{idol.position}</p>
                </div>
              </div>
            </div>
          </div>
          
          {idol.quote && (
            <div className="mt-6 p-4 bg-retro-yellow bg-opacity-20 border-2 border-retro-yellow rounded-lg">
              <p className="italic text-retro-brown">&ldquo;{idol.quote}&rdquo;</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t-2 border-retro-brown bg-retro-cream flex justify-end">
          <Button
            onClick={onClose}
            className="bg-retro-yellow hover:bg-retro-orange text-retro-brown font-medium py-1.5 px-4 rounded-md border-2 border-retro-brown transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(71,42,14,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(71,42,14,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] text-sm"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}; 