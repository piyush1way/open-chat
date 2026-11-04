import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo />
        <nav className="flex items-center gap-1 text-sm sm:gap-4">
          <Link to="/" hash="how" className="hidden px-2 text-muted-foreground transition-colors hover:text-foreground sm:block">
            How it works
          </Link>
          <Link to="/privacy" className="hidden px-2 text-muted-foreground transition-colors hover:text-foreground sm:block">
            Safety
          </Link>
          <Link
            to="/chat"
            className="rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground transition-transform hover:scale-105"
          >
            Start chatting
          </Link>
        </nav>
      </div>
    </header>
  );
}
