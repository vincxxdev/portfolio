'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export const SoundToggle = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('soundEnabled');
    if (saved !== null) {
      setSoundEnabled(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('soundToggle', { detail: soundEnabled }));
    }
  }, [soundEnabled, mounted]);

  if (!mounted) {
    return <div className="h-9 w-9" />;
  }

  return (
    <motion.button
      aria-label="Toggle Sound Effects"
      type="button"
      className="h-9 w-9 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700 hover:ring-2 ring-cyan-500 transition-all relative overflow-hidden"
      onClick={() => setSoundEnabled(!soundEnabled)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={soundEnabled ? 'Disattiva effetti sonori' : 'Attiva effetti sonori'}
    >
      {soundEnabled ? (
        <Volume2 className="h-5 w-5 text-cyan-500" />
      ) : (
        <VolumeX className="h-5 w-5 text-gray-500" />
      )}
    </motion.button>
  );
};
