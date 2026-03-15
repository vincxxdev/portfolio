"use client";

import { useState, useEffect } from 'react';
import CustomCursor from './CustomCursor';

const CursorProvider = () => {
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Controlla se è mobile o tablet
      const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      // Controlla se ha un touchscreen
      const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      // Mostra il cursore solo su dispositivi desktop senza touch
      setShowCursor(!isMobileDevice && !hasTouchScreen);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (showCursor) {
      root.classList.add('custom-cursor');
    } else {
      root.classList.remove('custom-cursor');
    }

    return () => {
      root.classList.remove('custom-cursor');
    };
  }, [showCursor]);

  return showCursor ? <CustomCursor /> : null;
};

export default CursorProvider;
