import type { ChatStatus } from "@/lib/mock-chat";
import { cn } from "@/lib/utils";

const LABELS: Record<ChatStatus, string> = {
  idle: "Not connected",
  searching: "Searching",
  connected: "Connected",
  disconnected: "Disconnected",
};

const DOT: Record<ChatStatus, string> = {
  idle: "bg-muted-foreground",
  searching: "bg-warning animate-pulse",
  connected: "bg-success",
  disconnected: "bg-destructive",
};

export function StatusBadge({ status }: { status: ChatStatus }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium">
      <span className={cn("h-2 w-2 rounded-full", DOT[status])} />
      {LABELS[status]}
    </span>
  );
}
