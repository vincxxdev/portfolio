'use client';

import { useCallback, useEffect, useState } from 'react';

type SoundType = 'click' | 'hover' | 'success' | 'pop';

export const useSound = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    // Check localStorage on mount
    const saved = localStorage.getItem('soundEnabled');
    if (saved !== null) {
      setSoundEnabled(JSON.parse(saved));
    }

    // Listen for sound toggle events
    const handleSoundToggle = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setSoundEnabled(customEvent.detail);
    };

    window.addEventListener('soundToggle', handleSoundToggle);
    return () => window.removeEventListener('soundToggle', handleSoundToggle);
  }, []);

  const playSound = useCallback((type: SoundType) => {
    if (!soundEnabled) return;

    // Create audio context for Web Audio API
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Different sounds for different actions
    switch (type) {
      case 'click':
        oscillator.frequency.value = 800;
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
        break;
      case 'hover':
        oscillator.frequency.value = 600;
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.05);
        break;
      case 'success':
        oscillator.frequency.value = 1000;
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
        break;
      case 'pop':
        oscillator.frequency.value = 1200;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.08);
        break;
    }
  }, [soundEnabled]);

  return { playSound };
};
