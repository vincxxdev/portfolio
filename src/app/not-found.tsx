import Button from './components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-9xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="text-3xl font-bold text-primary-text mb-4">
          Pagina Non Trovata
        </h2>
        <p className="text-secondary-text mb-8">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <Button href="/" variant="primary">
          Torna alla Home
        </Button>
      </div>
    </div>
  );
}
