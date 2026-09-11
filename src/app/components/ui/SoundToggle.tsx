'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocale } from '@/i18n';
import { useSound } from '../hooks/useSound';

export const SoundToggle = () => {
  const { t } = useLocale();
  const { soundEnabled, toggleSound } = useSound();

  return (
    <motion.button
      aria-label={t.accessibility.toggleSound}
      aria-pressed={soundEnabled}
      type="button"
      className="h-9 w-9 flex items-center justify-center rounded-sm border border-hairline bg-sunken text-ink hover:border-signal hover:text-signal-ink transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] relative overflow-hidden"
      onClick={toggleSound}
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
