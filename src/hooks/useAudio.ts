import { useState, useEffect, useRef } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { AudioOptions } from '@/types';

export function useAudio(url: string, options: AudioOptions = {}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useLocalStorage('audio_muted', false);
  const [volume, setVolume] = useLocalStorage('audio_volume', options.volume ?? 0.5);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audio = new Audio(url);
      audio.volume = isMuted ? 0 : volume;
      audio.loop = options.loop ?? false;
      audio.autoplay = options.autoplay ?? false;
      
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
      });
      
      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime);
      });
      
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
      });
      
      audio.addEventListener('play', () => {
        setIsPlaying(true);
      });
      
      audio.addEventListener('pause', () => {
        setIsPlaying(false);
      });
      
      audioRef.current = audio;
      
      return () => {
        audio.pause();
        audio.src = '';
        
        audio.removeEventListener('loadedmetadata', () => {});
        audio.removeEventListener('timeupdate', () => {});
        audio.removeEventListener('ended', () => {});
        audio.removeEventListener('play', () => {});
        audio.removeEventListener('pause', () => {});
      };
    }
  }, [url, options.loop, options.autoplay]);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);
  
  const play = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  };
  
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };
  
  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };
  
  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const setAudioVolume = (newVolume: number) => {
    // Ensure volume is between 0 and 1
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
  };
  
  return {
    audioRef,
    isPlaying,
    duration,
    currentTime,
    isMuted,
    volume,
    play,
    pause,
    stop,
    togglePlay,
    toggleMute,
    setVolume: setAudioVolume
  };
}

// Helper hook to manage multiple sound effects
export function useSoundEffects() {
  const [isMuted, setIsMuted] = useLocalStorage('sound_effects_muted', false);
  const [volume, setVolume] = useLocalStorage('sound_effects_volume', 0.7);
  
  const playSound = (url: string) => {
    if (isMuted || typeof window === 'undefined') return;
    
    const audio = new Audio(url);
    audio.volume = volume;
    audio.play().catch(error => {
      console.error('Error playing sound effect:', error);
    });
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const setEffectsVolume = (newVolume: number) => {
    // Ensure volume is between 0 and 1
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
  };
  
  return {
    isMuted,
    volume,
    playSound,
    toggleMute,
    setVolume: setEffectsVolume
  };
}
