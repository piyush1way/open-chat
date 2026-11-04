import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row">
        <Logo />
        <nav className="flex gap-6">
          <Link to="/terms" className="hover:text-foreground">Terms</Link>
          <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
          <Link to="/contact" className="hover:text-foreground">Contact</Link>
        </nav>
        <p>© {new Date().getFullYear()} StrangerConnect</p>
      </div>
    </footer>
  );
}
