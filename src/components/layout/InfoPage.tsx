import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

/** Shared shell for simple text pages (Terms, Privacy, Contact). */
export function InfoPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-16">
        <h1 className="text-4xl font-bold">{title}</h1>
        <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
