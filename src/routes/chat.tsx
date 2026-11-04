import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/layout/Logo";
import { StatusBadge } from "@/components/chat/StatusBadge";
import { MessageBubble, TypingBubble } from "@/components/chat/MessageBubble";
import { EmptyState, SearchingState } from "@/components/chat/ChatStates";
import { MessageInput } from "@/components/chat/MessageInput";
import { ChatControls } from "@/components/chat/ChatControls";
import { useMockChat } from "@/lib/mock-chat";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Chat — StrangerConnect" },
      { name: "description", content: "Chat anonymously with a random stranger on StrangerConnect." },
      { property: "og:title", content: "Chat — StrangerConnect" },
      { property: "og:description", content: "Chat anonymously with a random stranger." },
    ],
  }),
  component: ChatPage,
});

function ChatPage() {
  const chat = useMockChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Keep the newest message in view.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages, chat.strangerTyping]);

  const showList = chat.status === "connected" || chat.status === "disconnected";

  return (
    <div className="bg-glow flex h-dvh flex-col">
      <header className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
        <Logo />
        <StatusBadge status={chat.status} />
      </header>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-3 overflow-hidden p-3 sm:p-6">
        <div className="rounded-xl border border-warning/30 bg-warning/10 px-4 py-2 text-xs text-warning">
          Demo mode — matching and messages are simulated. No real strangers yet.
        </div>

        <ChatControls
          status={chat.status}
          onNext={chat.startSearch}
          onDisconnect={() => chat.disconnect()}
          onReport={() => toast.success("Report noted (demo — nothing was sent).")}
          onBlock={() => {
            chat.disconnect("You blocked this stranger.");
            toast("Stranger blocked (demo).");
          }}
        />

        <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card">
          <div className="min-h-0 flex-1 overflow-y-auto">
            {chat.status === "idle" && <EmptyState onStart={chat.startSearch} />}
            {chat.status === "searching" && <SearchingState />}
            {showList && (
              <div className="flex flex-col gap-4 p-4 sm:p-6">
                {chat.messages.map((m) => (
                  <MessageBubble key={m.id} message={m} />
                ))}
                {chat.strangerTyping && <TypingBubble />}
                {chat.status === "disconnected" && (
                  <button
                    onClick={chat.startSearch}
                    className="animate-rise mx-auto mt-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
                  >
                    Find a new stranger
                  </button>
                )}
                <div ref={bottomRef} />
              </div>
            )}
          </div>
          <MessageInput disabled={chat.status !== "connected"} onSend={chat.send} />
        </section>
      </div>
    </div>
  );
}
