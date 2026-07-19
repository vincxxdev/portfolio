export default function Loading() {
  return (
    <div className="bg-canvas flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="border-hairline border-t-signal h-10 w-10 animate-spin rounded-full border-2" />
        <p className="font-mono text-2xs uppercase text-ink-2">Caricamento</p>
      </div>
    </div>
  );
}
