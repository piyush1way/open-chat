import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand text-primary-foreground">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
          <circle cx="8" cy="12" r="4" />
          <circle cx="16" cy="12" r="4" />
        </svg>
      </span>
      Stranger<span className="text-gradient">Connect</span>
    </Link>
  );
}
