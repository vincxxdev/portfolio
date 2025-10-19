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
    <div className="min-h-screen flex items-center justify-center bg-primary-background px-4">
      <div className="max-w-md text-center">
        <h2 className="text-4xl font-bold text-primary-text mb-4">
          Oops! Qualcosa è andato storto
        </h2>
        <p className="text-secondary-text mb-8">
          Si è verificato un errore inaspettato. Riprova o torna alla home.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset} variant="primary">
            Riprova
          </Button>
          <Button href="/" variant="secondary">
            Torna alla Home
          </Button>
        </div>
      </div>
    </div>
  );
}
