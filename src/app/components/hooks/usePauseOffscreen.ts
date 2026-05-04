'use client';

import { useEffect, useRef, useState } from 'react';

interface Options {
  rootMargin?: string;
  threshold?: number;
}

export function usePauseOffscreen<T extends HTMLElement = HTMLDivElement>(
  options: Options = {},
) {
  const { rootMargin = '120px', threshold = 0 } = options;
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const visibilityHandler = () => {
      if (document.hidden) setIsInView(false);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (document.hidden) {
          setIsInView(false);
          return;
        }
        setIsInView(entry.isIntersecting);
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    document.addEventListener('visibilitychange', visibilityHandler);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', visibilityHandler);
    };
  }, [rootMargin, threshold]);

  return { ref, isInView };
}
