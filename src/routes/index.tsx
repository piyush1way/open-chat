import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StrangerConnect — Meet someone new" },
      { name: "description", content: "Anonymous, random one-on-one text conversations with strangers around the world." },
      { property: "og:title", content: "StrangerConnect — Meet someone new" },
      { property: "og:description", content: "Anonymous, random one-on-one conversations with strangers." },
    ],
  }),
  component: Index,
});

const STEPS = [
  { n: "01", title: "Hit Start", text: "No sign-up, no profile. Just one click." },
  { n: "02", title: "Get matched", text: "We pair you with a random stranger online." },
  { n: "03", title: "Talk or skip", text: "Chat freely, or tap Next to meet someone else." },
];

const SAFETY = [
  { title: "Anonymous by default", text: "You're just “Stranger”. Never share personal details." },
  { title: "Report & block", text: "One tap removes someone who makes you uncomfortable." },
  { title: "Nothing stored", text: "Conversations aren't saved once you disconnect." },
  { title: "18+ only", text: "StrangerConnect is intended for adults only." },
];

function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-glow">
          <div className="mx-auto flex max-w-4xl flex-col items-center px-5 py-24 text-center sm:py-32">
            <span className="animate-rise mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> Anonymous · Free · Instant
            </span>
            <h1 className="animate-rise text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              Meet someone new.
              <br />
              <span className="text-gradient">Start a conversation.</span>
            </h1>
            <p className="animate-rise mt-6 max-w-xl text-lg text-muted-foreground [animation-delay:100ms]">
              Get paired with a random stranger for a one-on-one text chat. No accounts, no names —
              just real conversations, whenever you want.
            </p>
            <Link
              to="/chat"
              className="animate-rise mt-10 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105 [animation-delay:200ms]"
            >
              Start Chatting →
            </Link>
          </div>
        </section>

        <section id="how" className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl font-bold">How it works</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/40">
                <span className="font-display text-sm text-primary">{s.n}</span>
                <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-24">
          <div className="rounded-3xl border border-border bg-card p-8 sm:p-12">
            <h2 className="text-3xl font-bold">Privacy & safety</h2>
            <p className="mt-2 text-muted-foreground">Designed to keep conversations light and you in control.</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {SAFETY.map((s) => (
                <div key={s.title} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <div>
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
