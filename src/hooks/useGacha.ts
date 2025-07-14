import { Idol, idols } from '@/data/idols';
import { pityConfig, rarities, RarityType } from '@/data/rarities';
import { Collection, CollectionShareData } from '@/types/collection';
import { GachaStats, PityCounter, PullAnimation, PullHistory, PullResult } from '@/types/gacha';
import { useCallback, useState } from 'react';
import { useSoundEffects } from '@/hooks/useAudio';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const generateUserId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export function useGacha() {
  const [userId] = useLocalStorage<string>('kpop_user_id', generateUserId());
  
  const [collection, setCollection] = useLocalStorage<Collection>('idol_collection', {
    items: [],
    lastUpdated: new Date().toISOString()
  });

  const [pullHistory, setPullHistory] = useLocalStorage<PullHistory>('pull_history', {
    pulls: [],
    lastPullTimestamp: null
  });

  const [pityCounter, setPityCounter] = useLocalStorage<PityCounter>('pity_counter', {
    rare: 0,
    epic: 0,
    legendary: 0,
    mythical: 0
  });

  const [animation, setAnimation] = useState<PullAnimation>({
    isPlaying: false,
    result: null,
    step: 'initial'
  });

  const { playSound, isMuted } = useSoundEffects();

  const calculateStats = useCallback((): GachaStats => {
    const totalPulls = pullHistory.pulls.length;
    const rarityDistribution: Record<RarityType, number> = {
      common: 0,
      rare: 0,
      epic: 0,
      legendary: 0,
      mythical: 0
    };
    
    let pityPulls = 0;
    
    pullHistory.pulls.forEach(pull => {
      rarityDistribution[pull.idol.rarity]++;
      if (pull.pityPull) pityPulls++;
    });
    
    return {
      totalPulls,
      rarityDistribution,
      pityPulls
    };
  }, [pullHistory.pulls]);

  const checkPity = useCallback((currentPity: PityCounter): RarityType | null => {
    if (currentPity.mythical >= pityConfig.mythical) {
      return 'mythical';
    }
    if (currentPity.legendary >= pityConfig.legendary) {
      return 'legendary';
    }
    if (currentPity.epic >= pityConfig.epic) {
      return 'epic';
    }
    if (currentPity.rare >= pityConfig.rare) {
      return 'rare';
    }
    return null;
  }, []);

  const updatePityCounters = useCallback((rarity: RarityType): PityCounter => {
    const newPityCounter = { ...pityCounter };
    
    newPityCounter.rare += 1;
    newPityCounter.epic += 1;
    newPityCounter.legendary += 1;
    newPityCounter.mythical += 1;
    
    if (rarity === 'rare' || rarity === 'epic' || rarity === 'legendary' || rarity === 'mythical') {
      newPityCounter.rare = 0;
    }
    
    if (rarity === 'epic' || rarity === 'legendary' || rarity === 'mythical') {
      newPityCounter.epic = 0;
    }
    
    if (rarity === 'legendary' || rarity === 'mythical') {
      newPityCounter.legendary = 0;
    }
    
    if (rarity === 'mythical') {
      newPityCounter.mythical = 0;
    }
    
    return newPityCounter;
  }, [pityCounter]);

  const getRandomIdol = useCallback((forcedRarity: RarityType | null = null): Idol => {
    if (forcedRarity) {
      const rarityCandidates = idols.filter(idol => idol.rarity === forcedRarity);
      if (rarityCandidates.length > 0) {
        return rarityCandidates[Math.floor(Math.random() * rarityCandidates.length)];
      }
    }
    
    const rarityRoll = Math.random() * 100;
    let cumulativeProbability = 0;
    
    const sortedRarities = Object.values(rarities).sort(
      (a, b) => b.probability - a.probability
    );
    
    for (const rarity of sortedRarities) {
      cumulativeProbability += rarity.probability;
      if (rarityRoll <= cumulativeProbability) {
        const rarityCandidates = idols.filter(idol => idol.rarity === rarity.id);
        if (rarityCandidates.length > 0) {
          return rarityCandidates[Math.floor(Math.random() * rarityCandidates.length)];
        }
      }
    }
    
    const commonIdols = idols.filter(idol => idol.rarity === 'common');
    return commonIdols[Math.floor(Math.random() * commonIdols.length)];
  }, []);

  const addToCollection = useCallback((idol: Idol) => {
    setCollection(prev => {
      const existingItemIndex = prev.items.findIndex(item => item.idol.id === idol.id);
      const updatedItems = [...prev.items];
      
      if (existingItemIndex >= 0) {
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          count: updatedItems[existingItemIndex].count + 1
        };
      } else {
        updatedItems.push({
          idol,
          obtainedAt: new Date().toISOString(),
          count: 1
        });
      }
      
      return {
        items: updatedItems,
        lastUpdated: new Date().toISOString()
      };
    });
  }, [setCollection]);

  const pullIdol = useCallback(() => {
    const pityRarity = checkPity(pityCounter);
    const pulledIdol = getRandomIdol(pityRarity);
    const newPityCounter = updatePityCounters(pulledIdol.rarity);
    setPityCounter(newPityCounter);
    
    const pullResult: PullResult = {
      idol: pulledIdol,
      timestamp: new Date().toISOString(),
      pityPull: pityRarity !== null
    };
    
    setPullHistory(prev => ({
      pulls: [pullResult, ...prev.pulls],
      lastPullTimestamp: pullResult.timestamp
    }));
    
    addToCollection(pulledIdol);
    
    if (!isMuted) {
      const soundEffect = rarities[pulledIdol.rarity].soundEffect;
      if (soundEffect) {
        playSound(soundEffect);
      }
    }
    
    setAnimation({
      isPlaying: true,
      result: pullResult,
      step: 'pulling'
    });
    
    setTimeout(() => {
      setAnimation(prev => ({ ...prev, step: 'reveal' }));
      
      setTimeout(() => {
        setAnimation(prev => ({ ...prev, step: 'complete' }));
        
        setTimeout(() => {
          setAnimation({
            isPlaying: false,
            result: null,
            step: 'initial'
          });
        }, 2000);
      }, 1500);
    }, 1500);
    
    return pullResult;
  }, [
    checkPity,
    pityCounter,
    getRandomIdol,
    updatePityCounters,
    setPityCounter,
    setPullHistory,
    addToCollection,
    isMuted,
    playSound
  ]);

  const skipAnimation = useCallback(() => {
    setAnimation(prev => ({
      ...prev,
      step: 'complete',
      isPlaying: false
    }));
  }, []);

  const exportCollection = useCallback(() => {
    const exportData = {
      collection,
      exportedAt: new Date().toISOString(),
      version: '1.0.0'
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileName = `kpop-collection-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
  }, [collection]);

  const importCollection = useCallback((jsonData: string) => {
    try {
      const importedData = JSON.parse(jsonData);
      
      if (importedData && importedData.collection) {
        setCollection(importedData.collection);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing collection:', error);
      return false;
    }
  }, [setCollection]);

  const clearCollection = useCallback(() => {
    setCollection({
      items: [],
      lastUpdated: new Date().toISOString()
    });
    
    setPullHistory({
      pulls: [],
      lastPullTimestamp: null
    });
    
    setPityCounter({
      rare: 0,
      epic: 0,
      legendary: 0,
      mythical: 0
    });
  }, [setCollection, setPullHistory, setPityCounter]);
  
  const generateShareLink = useCallback(() => {
    const shareData: CollectionShareData = {
      userId,
      collection,
      sharedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() 
    };
    
    const encodedData = encodeURIComponent(btoa(JSON.stringify(shareData)));
    
    const shareUrl = `${window.location.origin}/collection/shared?data=${encodedData}`;
    
    return shareUrl;
  }, [userId, collection]);
  
  const copyShareLink = useCallback(async () => {
    const shareUrl = generateShareLink();
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      return true;
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      return false;
    }
  }, [generateShareLink]);

  return {
    collection,
    pullIdol,
    animation,
    skipAnimation,
    
    pullHistory,
    pityCounter,
    stats: calculateStats(),
    
    exportCollection,
    importCollection,
    clearCollection,
    
    generateShareLink,
    copyShareLink,
    userId
  };
}

export default useGacha;
