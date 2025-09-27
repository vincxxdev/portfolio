"use client";

import { useState, useEffect } from 'react';
import CustomCursor from './CustomCursor';

const CursorProvider = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    }
  }, []);

  return isMobile ? null : <CustomCursor />;
};

export default CursorProvider;
