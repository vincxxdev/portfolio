'use client';

import { useEffect } from 'react';
import Button from './components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error only in development
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="bg-canvas flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h2 className="font-display mb-4 text-3xl font-bold text-ink sm:text-4xl">
          Qualcosa è andato storto
        </h2>
        <p className="mb-8 text-ink-2">
          Si è verificato un errore inaspettato. Riprova o torna alla home.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={reset} variant="primary">
            Riprova
          </Button>
          <Button href="/" variant="secondary">
            Torna alla home
          </Button>
        </div>
      </div>
    </div>
  );
}
