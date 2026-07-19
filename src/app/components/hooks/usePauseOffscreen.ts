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
  // Last intersection the observer reported. The observer does not re-fire on
  // tab return, so returning from a hidden tab has to replay this value or the
  // gated animation stays paused for good.
  const intersectingRef = useRef(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const visibilityHandler = () => {
      setIsInView(document.hidden ? false : intersectingRef.current);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        intersectingRef.current = entry.isIntersecting;
        setIsInView(document.hidden ? false : entry.isIntersecting);
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
