export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        <p className="text-secondary-text text-lg">Caricamento...</p>
      </div>
    </div>
  );
}
