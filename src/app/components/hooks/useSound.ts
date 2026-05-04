'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type SoundType = 'click' | 'hover' | 'success' | 'pop';

let sharedAudioContext: AudioContext | null = null;
let userHasInteracted = false;
let cachedHasFinePointer: boolean | null = null;

function hasFinePointer(): boolean {
  if (cachedHasFinePointer !== null) return cachedHasFinePointer;
  if (typeof window === 'undefined') return false;
  cachedHasFinePointer = window.matchMedia('(pointer: fine)').matches;
  return cachedHasFinePointer;
}

if (typeof window !== 'undefined') {
  const unlock = () => {
    userHasInteracted = true;
    if (sharedAudioContext?.state === 'suspended') sharedAudioContext.resume();
    window.removeEventListener('click', unlock);
    window.removeEventListener('touchstart', unlock);
    window.removeEventListener('keydown', unlock);
  };
  window.addEventListener('click', unlock, { once: true });
  window.addEventListener('touchstart', unlock, { once: true });
  window.addEventListener('keydown', unlock, { once: true });
}

function getAudioContext(): AudioContext | null {
  if (!userHasInteracted) return null;
  if (!sharedAudioContext || sharedAudioContext.state === 'closed') {
    sharedAudioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  if (sharedAudioContext.state === 'suspended') {
    sharedAudioContext.resume();
  }
  return sharedAudioContext;
}

export const useSound = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const lastHoverTime = useRef(0);

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

    if (type === 'hover') {
      if (!hasFinePointer()) return;
      const now = Date.now();
      if (now - lastHoverTime.current < 80) return;
      lastHoverTime.current = now;
    }

    const audioContext = getAudioContext();
    if (!audioContext) return;
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
