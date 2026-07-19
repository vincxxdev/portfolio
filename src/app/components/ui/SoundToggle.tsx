'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocale } from '@/i18n';

export const SoundToggle = () => {
  const { t } = useLocale();
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
      aria-label={t.accessibility.toggleSound}
      type="button"
      className="h-9 w-9 flex items-center justify-center rounded-sm border border-hairline bg-sunken text-ink hover:border-signal hover:text-signal-ink transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] relative overflow-hidden"
      onClick={() => setSoundEnabled(!soundEnabled)}
      title={soundEnabled ? t.accessibility.soundOn : t.accessibility.soundOff}
    >
      {soundEnabled ? (
        <Volume2 className="h-[18px] w-[18px]" />
      ) : (
        <VolumeX className="h-[18px] w-[18px] text-ink-3" />
      )}
    </motion.button>
  );
};
