import type { ChatStatus } from "@/lib/mock-chat";
import { cn } from "@/lib/utils";

interface Props {
  status: ChatStatus;
  onNext: () => void;
  onDisconnect: () => void;
  onReport: () => void;
  onBlock: () => void;
}

const base = "rounded-full border px-4 py-2 text-sm font-medium transition disabled:opacity-40 disabled:pointer-events-none";

export function ChatControls({ status, onNext, onDisconnect, onReport, onBlock }: Props) {
  const connected = status === "connected";
  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={onNext} disabled={status === "searching"} className={cn(base, "border-transparent bg-accent text-accent-foreground hover:brightness-110")}>
        Next stranger
      </button>
      <button onClick={onDisconnect} disabled={!connected && status !== "searching"} className={cn(base, "border-border bg-secondary hover:bg-muted")}>
        Disconnect
      </button>
      <button onClick={onReport} disabled={!connected} className={cn(base, "border-border text-warning hover:bg-muted")}>
        Report
      </button>
      <button onClick={onBlock} disabled={!connected} className={cn(base, "border-border text-destructive hover:bg-muted")}>
        Block
      </button>
    </div>
  );
}
