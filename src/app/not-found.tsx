import Button from './components/ui/Button';

export default function NotFound() {
  return (
    <div className="bg-canvas flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-2xs uppercase text-signal-ink">404</p>
        <h1 className="font-display mt-4 mb-4 text-4xl font-bold text-ink sm:text-5xl">
          Pagina non trovata
        </h1>
        <p className="mb-8 text-ink-2">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <Button href="/" variant="primary">
          Torna alla home
        </Button>
      </div>
    </div>
  );
}
