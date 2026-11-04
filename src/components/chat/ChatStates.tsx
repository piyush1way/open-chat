/** Full-panel states shown instead of the message list. */

export function EmptyState({ onStart }: { onStart: () => void }) {
  return (
    <div className="animate-rise flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-secondary text-3xl">💬</div>
      <h2 className="text-2xl font-semibold">Ready to meet someone?</h2>
      <p className="max-w-xs text-sm text-muted-foreground">
        You'll be paired with a random stranger. Be kind — you can leave anytime.
      </p>
      <button
        onClick={onStart}
        className="mt-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-glow transition-transform hover:scale-105"
      >
        Find a stranger
      </button>
    </div>
  );
}

export function SearchingState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 p-8 text-center">
      <div className="relative grid h-24 w-24 place-items-center">
        <span className="animate-radar absolute inset-0 rounded-full border-2 border-primary" />
        <span className="animate-radar absolute inset-0 rounded-full border-2 border-primary [animation-delay:0.7s]" />
        <span className="animate-radar absolute inset-0 rounded-full border-2 border-accent [animation-delay:1.4s]" />
        <span className="h-10 w-10 rounded-full bg-gradient-brand shadow-glow" />
      </div>
      <div>
        <h2 className="text-xl font-semibold">Looking for a stranger…</h2>
        <p className="mt-1 text-sm text-muted-foreground">Demo mode: this is a simulated match.</p>
      </div>
    </div>
  );
}
