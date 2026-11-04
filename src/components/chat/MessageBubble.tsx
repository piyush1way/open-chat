import type { ChatMessage } from "@/lib/mock-chat";
import { cn } from "@/lib/utils";

const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export function MessageBubble({ message }: { message: ChatMessage }) {
  if (message.author === "system") {
    return (
      <p className="animate-rise mx-auto max-w-sm text-center text-xs text-muted-foreground">
        {message.text}
      </p>
    );
  }
  const mine = message.author === "me";
  return (
    <div className={cn("animate-rise flex flex-col", mine ? "items-end" : "items-start")}>
      <span className="mb-1 px-1 text-[11px] font-medium text-muted-foreground">
        {mine ? "You" : "Stranger"}
      </span>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed sm:max-w-[65%]",
          mine
            ? "rounded-br-md bg-bubble-me text-bubble-me-foreground"
            : "rounded-bl-md bg-bubble-them text-bubble-them-foreground",
        )}
      >
        {message.text}
      </div>
      <time className="mt-1 px-1 text-[10px] text-muted-foreground">{formatTime(message.sentAt)}</time>
    </div>
  );
}

export function TypingBubble() {
  return (
    <div className="animate-rise flex w-fit gap-1 rounded-2xl rounded-bl-md bg-bubble-them px-4 py-3">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  );
}
